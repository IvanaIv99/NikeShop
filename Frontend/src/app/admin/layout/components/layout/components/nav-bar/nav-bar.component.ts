import { Component, EventEmitter, HostListener, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BerryConfig } from '../../../../../../app-config';
import { AuthService } from "../../../../../../shared/business-logic/services/auth/auth.service";
import {
  INotificationItem,
  NotificationsService,
} from '../../business-logic/notifications.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {
  @Output() NavCollapse = new EventEmitter();
  @Output() NavCollapsedMob = new EventEmitter();

  public navCollapsed;
  public windowWidth: number;
  public navCollapsedMob;

  public unreadCount = 0;
  public notifications: INotificationItem[] = [];

  private readonly subs = new Subscription();

  constructor(
    public authService: AuthService,
    public notificationsService: NotificationsService,
    private router: Router,
  ) {
    this.windowWidth = window.innerWidth;
    this.navCollapsed = this.windowWidth >= 1025 ? BerryConfig.isCollapse_menu : false;
    this.navCollapsedMob = false;
  }

  public ngOnInit(): void {
    this.subs.add(this.notificationsService.unreadCount$.subscribe((c) => (this.unreadCount = c)));
    this.subs.add(this.notificationsService.items$.subscribe((items) => (this.notifications = items)));
    this.notificationsService.startPolling();
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public navCollapse() {
    if (this.windowWidth >= 1025) {
      this.navCollapsed = !this.navCollapsed;
      this.NavCollapse.emit();
    }
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event: any): void {
    this.windowWidth = event.target.innerWidth;
    this.navCollapseMob();
  }

  public navCollapseMob() {
    if (this.windowWidth < 1025) {
      this.NavCollapsedMob.emit();
    }
  }

  public logout(): void {
    this.authService.logout();
  }

  public onNotificationClick(n: INotificationItem): void {
    if (n.read_at === null) {
      this.notificationsService.markRead(n.id).subscribe();
    }
    const link = n.data?.['link'];
    if (typeof link === 'string' && link.length > 0) {
      this.router.navigateByUrl(link);
    }
  }

  public markAllRead(event: Event): void {
    event.stopPropagation();
    this.notificationsService.markAllRead().subscribe();
  }

  public deleteAll(event: Event): void {
    event.stopPropagation();
    this.notificationsService.deleteAll().subscribe();
  }

  public titleFor(n: INotificationItem): string {
    switch (n.data?.['type']) {
      case 'new_order':
        return `New order #${n.data['order_id']}`;
      case 'low_stock':
        return `Low stock: ${n.data['product_name']}`;
      case 'out_of_stock':
        return `Sold out: ${n.data['product_name']}`;
      default:
        return 'Notification';
    }
  }

  public bodyFor(n: INotificationItem): string {
    switch (n.data?.['type']) {
      case 'new_order':
        return `${n.data['customer_name']} · $${Number(n.data['total']).toFixed(2)} · ${n.data['items_count']} item${n.data['items_count'] === 1 ? '' : 's'}`;
      case 'low_stock':
      case 'out_of_stock':
        return `SZ ${n.data['size']} · ${String(n.data['color']).toUpperCase()} · ${n.data['stock']} left`;
      default:
        return '';
    }
  }
}
