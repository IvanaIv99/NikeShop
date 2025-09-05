import {Component, OnInit, Input, ViewChildren, QueryList, ElementRef} from '@angular/core';
import {ICartItem} from "../../interfaces/i-cart-item";
import {CartService} from "../../business-logic/services/cart.service";
@Component({
  selector: 'tr[app-cart-item]',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],

})
export class CartItemComponent  implements OnInit {

  @Input() cartItem: ICartItem;
  @Input() index: number;

  constructor(
    private cartService: CartService
  ) {}

  ngOnInit() {

  }

  public removeItem(cartItem: ICartItem) {
    this.cartService.removeFromCart(cartItem);
  }

  updateItemTotal() {
    let total = this.cartItem.product.price * this.cartItem.quantity;
    this.cartItem.total = total;
    this.cartService.saveCart();

    return total;
  }
}
