import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CartService} from "../../../cart/business-logic/services/cart.service";
import {BlProcessOrderRequestsService} from "../../business-logic/requests/bl-process-order-requests.service";
import {City, Country} from 'country-state-city';
import {Router} from "@angular/router";
import {IOrderRequest} from "../../interfaces/i-order";
import {IOrderItem} from "../../interfaces/i-order-item";
import {PaymentMethod} from "../../../admin/orders/enums/payment-method";
import {SnackbarService} from "../../../shared/business-logic/services/common/snackbar/SnackbarService";

@Component({
  selector: 'app-orders',
  templateUrl: './process-order.component.html',
  styleUrls: ['./process-order.component.scss']
})
export class ProcessOrderComponent {

  form = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('',[Validators.required, Validators.minLength(2)]),
    email: new FormControl('',[Validators.required, Validators.email]),
    phone: new FormControl('',[Validators.required]),
    city: new FormControl(null,[Validators.required]),
    country: new FormControl(null,[Validators.required]),
    zip: new FormControl(null,[Validators.required, Validators.pattern(/^\d{5}(-\d{4})?$/)]),
    address: new FormControl('',[Validators.required]),
    paymentMethod: new FormControl(PaymentMethod.pay_on_delivery),
    additional: new FormControl(''),
  });

  protected cartProducts = [];
  protected subTotal: any = 0;

  protected countries = Country.getAllCountries();
  protected cities = null;

  protected selectedCountry: any;

  constructor(
    private cartService: CartService,
    private requestsService: BlProcessOrderRequestsService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {
  }

  ngOnInit() {
    this.cartService.loadCart();
    this.cartProducts = this.cartService.getCartItems();
    this.subTotal = this.cartService.getTotal();
  }

  protected submit(): void {
    const dataToSend: IOrderRequest = this.getDataForSend();
    this.requestsService.insert(dataToSend).subscribe({
      next: (data) => {
        const orderId = data.order_id;
        this.router.navigate(['process-order/success', orderId]);
        this.cartService.clearCart();
      },
      error: (err) => this.snackbarService.showError('Error processing order.')
    })
  }

  private getDataForSend(): IOrderRequest {
    let formValue = this.form.getRawValue();
    return {
      first_name: formValue.firstName,
      last_name: formValue.lastName,
      email: formValue.email,
      phone: formValue.phone,
      country: this.selectedCountry.name,
      zip: formValue.zip,
      city: formValue.city.name,
      address: formValue.address,
      payment_method: formValue.paymentMethod as PaymentMethod,
      additional:formValue.additional,
      subtotal: this.subTotal,
      items: this.cartService.getCartItems().map(item => ({
        product: item.product,
        quantity: item.quantity,
        size_id: item.size.id,
        color_id: item.color.id,
        total: item.total
      })) as IOrderItem[]
    }
  }

  protected onCountryChange(): void {
    let selectedCountry = this.form.get('country').value;
    this.selectedCountry = selectedCountry;
    this.cities = City.getCitiesOfCountry(selectedCountry.isoCode)
  }
}
