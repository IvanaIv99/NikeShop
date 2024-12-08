import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../shared/environment/environment";
import {AuthService} from "../../../shared/services/auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
  }

  onSubmit() {
    this.http.post(`${environment.apiUrl}/auth/login`, this.loginForm.value)
      .subscribe({
        next: (user) => {
          this.authService.setCurrentUser(JSON.stringify(user));
        },
        error: (e) => console.error(e)
      });

    this.router.navigate(['/admin-panel/dashboard']);
  }

}
