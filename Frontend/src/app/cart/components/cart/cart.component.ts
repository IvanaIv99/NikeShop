import { Component, OnInit, Input,  EventEmitter, Output } from '@angular/core';
import {IProduct} from "../../../admin/products/interfaces/i-product";
import {CartService} from "../../business-logic/cart.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @Input() products: IProduct[];
  @Output() productRemoved = new EventEmitter();

  cartProducts = [];

  constructor(
    private cartService: CartService
  ) {
  }

  ngOnInit() {
    this.cartService.loadCart();
    this.cartProducts = this.cartService.getCartItems();
  }

  clearCart() {
    this.cartService.clearCart();
    this.cartProducts = [...this.cartService.getCartItems()];
  }

  get total() {
    return this.cartService.calcTotal();
  }

}
