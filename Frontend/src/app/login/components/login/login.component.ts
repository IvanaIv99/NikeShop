import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {AuthService} from "../../../shared/business-logic/services/auth/auth.service";
import {ICredentials, ICredentialsResponse} from "../../interfaces/i-credentials";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService
  ) {}

  public form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
  }

  public submit(): void {
    const dataToSend: ICredentials = this.getDataForSend();
    this.authService.login(dataToSend);
  }

  public getDataForSend(): ICredentials {
    let formValue = this.form.getRawValue();
    return {
      email: formValue.email,
      password: formValue.password
    }
  }

}
