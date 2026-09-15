import { Component, OnInit, Input } from '@angular/core';
import { ICartItem } from "../../interfaces/i-cart-item";
import { CartService } from "../../business-logic/services/cart.service";

@Component({
    selector: 'app-cart-item',
    templateUrl: './cart-item.component.html',
    styleUrls: ['./cart-item.component.scss'],
    standalone: false
})
export class CartItemComponent implements OnInit {

  @Input() cartItem: ICartItem;
  @Input() index: number;

  constructor(
    private cartService: CartService
  ) {}

  ngOnInit() {}

  public removeItem(cartItem: ICartItem): void {
    this.cartService.removeFromCart(cartItem);
  }

  public increment(): void {
    this.cartService.updateItemQuantity(this.cartItem, this.cartItem.quantity + 1);
  }

  public decrement(): void {
    if (this.cartItem.quantity <= 1) return;
    this.cartService.updateItemQuantity(this.cartItem, this.cartItem.quantity - 1);
  }

  public itemTotal(): number {
    return this.cartItem.product.price * this.cartItem.quantity;
  }
}
