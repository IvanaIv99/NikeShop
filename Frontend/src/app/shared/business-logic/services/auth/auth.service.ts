import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {BlLoginRequestsService} from "../../../../login/business-logic/requests/bl-login-requests.service";
import {ICredentials} from "../../../../login/interfaces/i-credentials";
import {SnackbarService} from "../common/snackbar/snackbar.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private loginRequestsService: BlLoginRequestsService,
    private snackBarService: SnackbarService
  ) { }

  public login(data: ICredentials): void {
    this.loginRequestsService.login(data).subscribe({
      next: (data) => {
        this.setJwtToken(data.jwtToken);
        this.router.navigateByUrl("/admin-panel/dashboard");
      },
      error: (resp) => this.snackBarService.showError(resp.error.message)
    })
  }

  public logout(): void {
    this.loginRequestsService.logout().subscribe({
      next: () => {
        this.removeJwtToken();
        this.router.navigate(['login']);
      },
      error: (err) => this.snackBarService.showError(err)
    })
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem('jwtToken') !== null;
  }

  public setJwtToken(token: string): void {
    localStorage.setItem("jwtToken", token);
  }

  public removeJwtToken(): void {
    localStorage.removeItem("jwtToken");
  }

  public getJwtToken(): string {
    return localStorage.getItem("jwtToken");
  }
}
