import { Component, OnInit, Input } from '@angular/core';
import { ICartItem } from "../../interfaces/i-cart-item";
import { CartService } from "../../business-logic/services/cart.service";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
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
    this.cartItem.quantity += 1;
    this.recalcAndSave();
  }

  public decrement(): void {
    if (this.cartItem.quantity <= 1) return;
    this.cartItem.quantity -= 1;
    this.recalcAndSave();
  }

  public itemTotal(): number {
    const total = this.cartItem.product.price * this.cartItem.quantity;
    this.cartItem.total = total;
    return total;
  }

  private recalcAndSave(): void {
    this.cartItem.total = this.cartItem.product.price * this.cartItem.quantity;
    this.cartService.saveCart();
  }
}
