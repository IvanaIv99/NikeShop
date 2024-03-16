import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import { Router } from '@angular/router';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private http: HttpClient, private router: Router) { }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  onSubmit() {
    this.http.post(`${environment.apiUrl}/auth/login`, this.loginForm.value)
      .subscribe({
        next: (response) => {
          localStorage.setItem('access_token', response['token']);
        },
        error: (e) => console.error(e)
      });

    // If login successful, navigate to dashboard page
    this.router.navigate(['admin/dashboard']);
  }

}
