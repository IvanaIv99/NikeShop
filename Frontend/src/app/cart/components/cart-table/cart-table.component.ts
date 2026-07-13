import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICartItem } from '../../interfaces/i-cart-item';
import { CartService } from '../../business-logic/services/cart.service';
import { CartSummaryService } from '../../business-logic/services/cart-summary.service';

@Component({
  selector: 'app-cart-table',
  templateUrl: './cart-table.component.html',
  styleUrls: ['./cart-table.component.scss']
})
export class CartTableComponent implements OnInit, OnDestroy {

  public cartItems: ICartItem[] = [];
  public subtotal = 0;
  public shipping = 0;
  public grandTotal = 0;

  private sub?: Subscription;

  constructor(
    private cartService: CartService,
    private cartSummaryService: CartSummaryService
  ) {}

  ngOnInit(): void {
    this.sub = this.cartService.items$.subscribe(items => {
      this.cartItems = items;
      this.loadSummary();
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  private loadSummary(): void {
    if (!this.cartItems.length) {
      this.subtotal = this.shipping = this.grandTotal = 0;
      return;
    }

    this.cartSummaryService.getSummary(this.cartItems).subscribe({
      next: (summary) => {
        this.subtotal = summary.subtotal;
        this.shipping = summary.shipping;
        this.grandTotal = summary.grandTotal;
      }
    });
  }
}
