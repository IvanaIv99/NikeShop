import { Component, EventEmitter, HostListener, Output } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  @Output() NavCollapsedMob = new EventEmitter();
  public navCollapsedMob = window.innerWidth;
  public windowWidth: number;

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
