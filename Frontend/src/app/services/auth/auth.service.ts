import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,public router: Router) { }

  getToken() {
    return localStorage.getItem('access_token');
  }

  logout() {
    let removeToken = localStorage.removeItem('access_token');

    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }

  isLoggedIn(): boolean {
    //TODO: Check token expiry and other security checks
    return (localStorage.getItem('access_token') !== null);
  }
}
