import {Component, Input} from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [],
  templateUrl: './back-button.component.html',
  styleUrl: './back-button.component.scss'
})
export class BackButtonComponent {
  @Input() routerLink?: string;

  constructor(private location: Location) {}

  goBack() {
    if (this.routerLink) {
      window.location.href = this.routerLink;
    } else {
      this.location.back();
    }
  }
}
