import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import {environment} from "../../environment/environment";
import {BlLoginRequestsService} from "../../../login/business-logic/requests/bl-login-requests.service";
import {ICredentials} from "../../../login/interfaces/i-credentials";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public router: Router,
    public loginRequestsService: BlLoginRequestsService
  ) { }

  login(data: ICredentials): void {
    this.loginRequestsService.login(data).subscribe({
      next: (data) => {
        this.setJwtToken(data.jwtToken);
        this.router.navigateByUrl("/admin-panel/dashboard");
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  logout(): void {
    this.loginRequestsService.logout().subscribe({
      next: () => {
        this.removeJwtToken();
        this.router.navigate(['login']);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('jwtToken') !== null;
  }

  setJwtToken(token: string): void {
    localStorage.setItem("jwtToken", token);
  }

  removeJwtToken(): void {
    localStorage.removeItem("jwtToken");
  }

  setCurrentUser(user: string): void {
    localStorage.setItem('currentUser', user);
  }
}
