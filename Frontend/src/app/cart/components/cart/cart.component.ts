import { Component, OnInit } from '@angular/core';
import { ICartItem } from "../../interfaces/i-cart-item";
import { CartService } from "../../business-logic/services/cart.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public cartItems: ICartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.items$.subscribe(items => {
      this.cartItems = items;
    });
  }

  getTotal(): number {
    return this.cartService.getTotal();
  }

  clearCart() {
    this.cartService.clearCart();
  }
}
