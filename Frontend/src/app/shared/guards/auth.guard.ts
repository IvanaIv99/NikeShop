import { Injectable } from "@angular/core";
import { AuthService } from "../business-logic/auth.service";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return true;

    //fix this with my auth

    // const isLoggedIn = this.authService.isLoggedIn();
    // if(!isLoggedIn) {
    //   this.router.navigateByUrl("/");
    // }
    // return isLoggedIn;
  }

}
