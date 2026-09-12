import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {AuthService} from "../business-logic/services/auth/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.prepareRequest(req)).pipe(
      catchError((error: HttpErrorResponse) => {
        // Sanctum tokens are opaque (not JWTs), so we can't read their expiry
        // client-side. Instead, treat a 401 on an authenticated session as an
        // expired/revoked token: drop it and send the admin back to login.
        if (error.status === 401 && this.authService.isLoggedIn()) {
          this.authService.removeJwtToken();
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }

  prepareRequest(req: HttpRequest<any>): HttpRequest<any> {
    const token = this.authService.getJwtToken();
    if (!token) {
      return req;
    }

    return req.clone({
      setHeaders: {
        Authorization: "Bearer " + token
      }
    })
  }

}
