import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CartService} from "../../../cart/business-logic/cart.service";
import {IOrder, IOrderRequest} from "../../interfaces/IOrder";
import {IOrderItem} from "../../interfaces/IOrderItem";
import {BlProcessOrderRequestsService} from "../../business-logic/requests/bl-process-order-requests.service";
import {Observable} from "rxjs";
import { Country, State, City }  from 'country-state-city';

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
    paymentMethod: new FormControl('cash_on_delivery'),
    additional: new FormControl(''),
  });

  cartProducts = [];
  subTotal: any = 0;

  countries = Country.getAllCountries();
  cities = null;

  selectedCountry: any;

  constructor(
    private cartService: CartService,
    private requestsService: BlProcessOrderRequestsService
  ) {
  }

  ngOnInit() {
    this.cartService.loadCart();
    this.cartProducts = this.cartService.getCartItems();
    this.subTotal = this.cartService.calcTotal();
  }

  submit(): void {
    const dataToSend: IOrderRequest = this.getDataForSend();
    this.requestsService.insert(dataToSend).subscribe({
      next: (data) => {
        alert("Order Created");
      },
      error: (err) => {
        alert(err);
      }
    })
  }

  getDataForSend(): IOrderRequest {
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
      payment_method: formValue.paymentMethod,
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

  onCountryChange(): void {
    let selectedCountry = this.form.get('country').value;
    this.selectedCountry = selectedCountry;
    this.cities = City.getCitiesOfCountry(selectedCountry.isoCode)
  }
}
