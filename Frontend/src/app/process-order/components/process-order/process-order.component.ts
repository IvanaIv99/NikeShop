import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CartService } from "../../../cart/business-logic/services/cart.service";
import { BlProcessOrderRequestsService } from "../../business-logic/requests/bl-process-order-requests.service";
import { City, Country } from 'country-state-city';
import { Router } from "@angular/router";
import { IOrderRequest } from "../../interfaces/i-order";
import { SnackbarService } from "../../../shared/business-logic/services/common/snackbar/snackbar.service";
import { CartSummaryService } from "../../../cart/business-logic/services/cart-summary.service";
import { EnumsService } from "../../../shared/business-logic/services/enums/enums.service";
import { IEnumOption } from "../../../shared/interfaces/i-enums";

@Component({
  selector: 'app-orders',
  templateUrl: './process-order.component.html',
  styleUrls: ['./process-order.component.scss']
})
export class ProcessOrderComponent implements OnInit {

  form!: FormGroup;
  submitted = false;

  protected cartProducts = [];
  protected itemsSubtotal = 0;
  protected shippingFee = 0;
  protected grandTotal = 0;
  protected countries = Country.getAllCountries();
  protected cities = [];
  protected selectedCountry: any;
  protected paymentMethods: IEnumOption[] = [];

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private requestsService: BlProcessOrderRequestsService,
    private cartSummaryService: CartSummaryService,
    private enumsService: EnumsService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadCart();
    this.loadSummary();
    this.loadPaymentMethods();
  }

  private loadPaymentMethods(): void {
    this.enumsService.getPaymentMethods().subscribe({
      next: (methods) => this.paymentMethods = methods
    });
  }

  private loadSummary(): void {
    if (!this.cartProducts.length) return;

    this.cartSummaryService.getSummary(this.cartProducts).subscribe({
      next: (summary) => {
        this.itemsSubtotal = summary.subtotal;
        this.shippingFee = summary.shipping;
        this.grandTotal = summary.grandTotal;
      }
    });
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
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      email: formValue.email,
      phone: formValue.phone,
      country: this.selectedCountry.name,
      city: formValue.city.name,
      zip: formValue.zip,
      address: formValue.address,
      paymentMethod: formValue.paymentMethod,
      additional: formValue.additional,
      orderItems: this.cartProducts.map(item => ({
        variantId: item.variantId,
        quantity: item.quantity
      }))
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
