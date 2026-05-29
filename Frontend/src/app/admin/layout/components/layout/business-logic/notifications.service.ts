import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, timer } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../../../shared/environment/environment';
import { WebApiService } from '../../../../../shared/business-logic/services/api/web-api.service';

export interface INotificationItem {
  id: string;
  data: {
    type: 'new_order' | 'low_stock' | 'out_of_stock' | string;
    [key: string]: any;
  };
  read_at: string | null;
  created_at: string;
}

interface INotificationsResponse {
  items: INotificationItem[];
  unread_count: number;
}

@Injectable({ providedIn: 'root' })
export class NotificationsService implements OnDestroy {
  private readonly base = `${environment.apiUrl}/notifications`;

  public readonly items$ = new BehaviorSubject<INotificationItem[]>([]);
  public readonly unreadCount$ = new BehaviorSubject<number>(0);

  private pollSub?: Subscription;

  constructor(private readonly webApiService: WebApiService) {}

  public startPolling(intervalMs: number = 30_000): void {
    if (this.pollSub) return;
    this.pollSub = timer(0, intervalMs)
      .pipe(switchMap(() => this.fetch()))
      .subscribe();
  }

  public stopPolling(): void {
    this.pollSub?.unsubscribe();
    this.pollSub = undefined;
  }

  public fetch(): Observable<INotificationsResponse> {
    return this.webApiService.get<INotificationsResponse>(this.base).pipe(
      tap((res) => {
        this.items$.next(res.items ?? []);
        this.unreadCount$.next(res.unread_count ?? 0);
      })
    );
  }

  public markRead(id: string): Observable<unknown> {
    return this.webApiService.post(`${this.base}/${id}/read`, {}).pipe(
      tap(() => {
        const items = this.items$.value.map((n) =>
          n.id === id && n.read_at === null ? { ...n, read_at: new Date().toISOString() } : n
        );
        this.items$.next(items);
        this.unreadCount$.next(Math.max(0, this.unreadCount$.value - 1));
      })
    );
  }

  public markAllRead(): Observable<unknown> {
    return this.webApiService.post(`${this.base}/read-all`, {}).pipe(
      tap(() => {
        const now = new Date().toISOString();
        this.items$.next(this.items$.value.map((n) => ({ ...n, read_at: n.read_at ?? now })));
        this.unreadCount$.next(0);
      })
    );
  }

  public deleteOne(id: string): Observable<unknown> {
    return this.webApiService.delete(`${this.base}/${id}`).pipe(
      tap(() => {
        const removed = this.items$.value.find((n) => n.id === id);
        this.items$.next(this.items$.value.filter((n) => n.id !== id));
        if (removed && removed.read_at === null) {
          this.unreadCount$.next(Math.max(0, this.unreadCount$.value - 1));
        }
      })
    );
  }

  public deleteAll(): Observable<unknown> {
    return this.webApiService.delete(`${this.base}`).pipe(
      tap(() => {
        this.items$.next([]);
        this.unreadCount$.next(0);
      })
    );
  }

  public ngOnDestroy(): void {
    this.stopPolling();
  }
}
