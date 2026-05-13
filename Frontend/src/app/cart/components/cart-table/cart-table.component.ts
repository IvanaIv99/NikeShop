import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICartItem } from '../../interfaces/i-cart-item';
import { CartService } from '../../business-logic/services/cart.service';

@Component({
  selector: 'app-cart-table',
  templateUrl: './cart-table.component.html',
  styleUrls: ['./cart-table.component.scss']
})
export class CartTableComponent implements OnInit, OnDestroy {

  public cartItems: ICartItem[] = [];
  private sub?: Subscription;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.sub = this.cartService.items$.subscribe(items => this.cartItems = items);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  get subtotal(): number {
    return this.cartService.getTotal();
  }

  get taxEstimate(): number {
    return Math.round(this.subtotal * 0.08875 * 100) / 100;
  }

  get grandTotal(): number {
    const shipping = this.subtotal >= 150 ? 0 : (this.cartItems.length ? 9.95 : 0);
    return Math.round((this.subtotal + this.taxEstimate + shipping) * 100) / 100;
  }
}
