import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "../../../shared/business-logic/services/auth/auth.service";
import { ICredentials } from "../../interfaces/i-credentials";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  public submit(): void {
    this.submitted = true;

    if (!this.form || this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const dataToSend: ICredentials = this.form.getRawValue();
    this.authService.login(dataToSend);
  }

  getFormErrors(controlName: string): string[] {
    const control = this.form.get(controlName);
    if (!control || !control.errors || (!control.touched && !this.submitted)) return [];

    return Object.keys(control.errors).map(error => {
      switch (error) {
        case 'required': return 'This field is required';
        case 'email': return 'Invalid email format';
        case 'minlength': return `Minimum ${control.errors['minlength'].requiredLength} characters`;
        default: return 'Invalid value';
      }
    });
  }
}
