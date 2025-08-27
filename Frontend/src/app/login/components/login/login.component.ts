import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../shared/environment/environment";
import {AuthService} from "../../../shared/services/auth/auth.service";
import {of, tap} from "rxjs";
import {ICredentials, ICredentialsResponse} from "../../interfaces/i-credentials";
import {catchError} from "rxjs/internal/operators/catchError";
import {BlLoginRequestsService} from "../../business-logic/requests/bl-login-requests.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService
  ) {}

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
  }

  submit(): void {
    const dataToSend: ICredentials = this.getDataForSend();
    this.authService.login(dataToSend);
  }

  getDataForSend(): ICredentials {
    let formValue = this.form.getRawValue();
    return {
      email: formValue.email,
      password: formValue.password
    }
  }

}
