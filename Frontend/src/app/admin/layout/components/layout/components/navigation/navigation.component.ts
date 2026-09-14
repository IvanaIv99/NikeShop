import { Component, EventEmitter, HostListener, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../../../../shared/business-logic/services/auth/auth.service';
import { IAdminUser } from '../../../../../../shared/inferfaces/admin/i-admin-user';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    standalone: false
})
export class NavigationComponent implements OnInit, OnDestroy {
  @Output() NavCollapsedMob = new EventEmitter();
  public navCollapsedMob = window.innerWidth;
  public windowWidth: number;

  public user: IAdminUser | null = null;

  private readonly subs = new Subscription();

  constructor(private authService: AuthService) {}

  public ngOnInit(): void {
    this.subs.add(this.authService.getCurrentUser().subscribe({ next: (user) => (this.user = user) }));
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public get initials(): string {
    if (!this.user) {
      return '';
    }
    const first = this.user.first_name?.charAt(0) ?? '';
    const last = this.user.last_name?.charAt(0) ?? '';
    const initials = `${first}${last}`.toUpperCase();
    return initials || (this.user.email?.charAt(0)?.toUpperCase() ?? '?');
  }

  public get fullName(): string {
    if (!this.user) {
      return '';
    }
    return `${this.user.first_name ?? ''} ${this.user.last_name ?? ''}`.trim();
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event: any) {
    this.windowWidth = event.target.innerWidth;
    this.navCollapseMob();
  }

  public navCollapseMob() {
    if (this.windowWidth < 1025) {
      this.NavCollapsedMob.emit();
    }
  }
}
