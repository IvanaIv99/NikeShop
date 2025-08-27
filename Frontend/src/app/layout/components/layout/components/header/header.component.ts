import { Component } from '@angular/core';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from '@angular/router';
import {AuthService} from "../../../../../shared/services/auth/auth.service";
import {filter} from "rxjs";
import {CartService} from "../../../../../cart/business-logic/cart.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  isLoggedIn: boolean = false;
  currentRoute: string = '';
  countCart: any = this.cartService.count;

  constructor(
    public authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute = event.urlAfterRedirects;
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();

    this.router.events.forEach((event) => {
      if(event instanceof NavigationEnd) {
        this.isLoggedIn = this.authService.isLoggedIn();
      }
    });

    this.cartService.countInCart().subscribe(count => {
        this.countCart = count
      }
    );
  }

  logout(): void {
    this.authService.logout();
  }

  isHome(): boolean {
    return this.currentRoute === ('/home' || '/');
  }

}
