import { Component, OnInit, Input,  EventEmitter, Output } from '@angular/core';
import {CartService} from "../../services/cart/cart.service";
import {Product} from "../../inferfaces/IProduct";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @Input() products: Product[];
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
