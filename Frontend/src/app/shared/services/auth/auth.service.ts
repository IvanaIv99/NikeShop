import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import {environment} from "../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    public router: Router
  ) { }

  logout() {

    this.http.post(`${environment.apiUrl}/auth/logout`, [])
      .subscribe({
        next: (response) => {},
        error: (e) => console.error(e)
      });

    let removeToken = localStorage.removeItem('currentUser');
    if (removeToken == null) {
      this.router.navigate(['admin/login']);
    }
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }

  setCurrentUser(user: string): void {
    localStorage.setItem('currentUser', user);
  }
}
