import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {CartService} from "../../services/cart/cart.service";
import {OrderService} from "../../services/order/order.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  orderForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
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
}
