import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CartService} from "../../services/cart/cart.service";
import {OrderService} from "../../services/order/order.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {

  orderForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('',[Validators.required, Validators.minLength(2)]),
    email: new FormControl('',[Validators.required, Validators.email]),
    phone: new FormControl('',[Validators.required]),
    city: new FormControl('',[Validators.required]),
    country: new FormControl('',[Validators.required]),
    address: new FormControl('',[Validators.required]),
    additional: new FormControl(''),
    paymentMethod: new FormControl(''),
  });

  cartProducts = [];
  subTotal: any = 0;

  constructor(
    private cartService: CartService,
    private orderService: OrderService
  ) {
  }

  ngOnInit() {
    this.cartService.loadCart();
    this.cartProducts = this.cartService.getCartItems();
    this.subTotal = this.cartService.calcTotal()
  }

  submit(): any{
    console.log(this.orderForm.value);
  }
}
