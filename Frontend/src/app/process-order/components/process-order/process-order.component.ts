import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CartService } from "../../../cart/business-logic/services/cart.service";
import { BlProcessOrderRequestsService } from "../../business-logic/requests/bl-process-order-requests.service";
import { City, Country } from 'country-state-city';
import { Router } from "@angular/router";
import { IOrderRequest } from "../../interfaces/i-order";
import { IOrderItem } from "../../interfaces/i-order-item";
import { SnackbarService } from "../../../shared/business-logic/services/common/snackbar/snackbar.service";

@Component({
  selector: 'app-orders',
  templateUrl: './process-order.component.html',
  styleUrls: ['./process-order.component.scss']
})
export class ProcessOrderComponent implements OnInit {

  form!: FormGroup;
  submitted = false;

  protected cartProducts = [];
  protected subTotal: any = 0;
  protected countries = Country.getAllCountries();
  protected cities = [];
  protected selectedCountry: any;

  protected readonly SHIPPING_CHARGE = 20;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private requestsService: BlProcessOrderRequestsService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadCart();
  }

  private initForm(): void {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      country: [null, [Validators.required]],
      city: [null, [Validators.required]],
      zip: [null, [Validators.required, Validators.pattern(/^\d{5}(-\d{4})?$/)]],
      address: ['', [Validators.required, Validators.minLength(2)]],
      paymentMethod: ['', [Validators.required]],
      additional: ['']
    });
  }

  private loadCart(): void {
    this.cartService.loadCart();
    this.cartProducts = this.cartService.getCartItems();
    this.subTotal = this.cartService.getTotal() + this.SHIPPING_CHARGE;
  }

  protected onCountryChange(): void {
    this.selectedCountry = this.form.get('country')!.value;
    this.cities = City.getCitiesOfCountry(this.selectedCountry.isoCode);
  }

  protected submit(): void {
    this.submitted = true;

    if (!this.form || this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const dataToSend: IOrderRequest = this.getDataForSend();
    this.requestsService.insert(dataToSend).subscribe({
      next: (data) => {
        this.router.navigate(['process-order/success', data.order_id]);
        this.cartService.clearCart();
      },
      error: () => this.snackbarService.showError('Error processing order.')
    });
  }

  private getDataForSend(): IOrderRequest {
    const formValue = this.form.getRawValue();
    return {
      first_name: formValue.firstName,
      last_name: formValue.lastName,
      email: formValue.email,
      phone: formValue.phone,
      country: this.selectedCountry.name,
      city: formValue.city.name,
      zip: formValue.zip,
      address: formValue.address,
      payment_method: formValue.paymentMethod,
      additional: formValue.additional,
      subtotal: this.subTotal,
      items: this.cartProducts.map(item => ({
        product: item.product,
        quantity: item.quantity,
        size_id: item.size.id,
        color_id: item.color.id,
        total: item.total
      })) as IOrderItem[]
    }
  }

  getFormErrors(controlName: string): string[] {
    const control = this.form.get(controlName);
    if (!control || !control.errors || (!control.touched && !this.submitted)) return [];

    return Object.keys(control.errors).map(error => {
      switch (error) {
        case 'required': return 'This field is required';
        case 'minlength': return `Minimum ${control.errors['minlength'].requiredLength} characters`;
        case 'maxlength': return `Maximum ${control.errors['maxlength'].requiredLength} characters`;
        case 'email': return 'Invalid email format';
        case 'pattern': return 'Invalid format';
        default: return 'Invalid value';
      }
    });
  }
}
