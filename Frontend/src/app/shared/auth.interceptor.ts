import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "./business-logic/auth.service";
import { Injectable } from "@angular/core";

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