import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import {AuthService} from "../business-logic/services/auth/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifyRequest = this.prepareRequest(req);
    return next.handle(modifyRequest);
  }

  prepareRequest(req: HttpRequest<any>) {
    return req.clone({
      setHeaders: {
        Authorization: "Bearer " + this.authService.getJwtToken()
      }
    })
  }

}
