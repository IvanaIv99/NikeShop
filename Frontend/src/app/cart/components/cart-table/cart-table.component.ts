import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICartItem } from '../../interfaces/i-cart-item';
import { CartService } from '../../business-logic/services/cart.service';
import { CartSummaryService } from '../../business-logic/services/cart-summary.service';

@Component({
    selector: 'app-cart-table',
    templateUrl: './cart-table.component.html',
    styleUrls: ['./cart-table.component.scss'],
    standalone: false
})
export class CartTableComponent implements OnInit, OnDestroy {

  public cartItems: ICartItem[] = [];
  public subtotal = 0;
  public shipping = 0;
  public grandTotal = 0;
  public summaryLoading = false;

  private sub?: Subscription;

  constructor(
    private cartService: CartService,
    private cartSummaryService: CartSummaryService
  ) {}

  ngOnInit(): void {
    this.sub = this.cartService.items$.subscribe(items => {
      this.cartItems = items;
      this.computeLocalTotals();
      this.loadSummary();
    });
  }

  private computeLocalTotals(): void {
    // Subtotal is safe to show instantly; shipping & total are server-authoritative
    // and are revealed only once loadSummary() resolves, to avoid a visible jump.
    this.subtotal = this.cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  private loadSummary(): void {
    if (!this.cartItems.length) {
      this.subtotal = this.shipping = this.grandTotal = 0;
      this.summaryLoading = false;
      return;
    }

    this.summaryLoading = true;
    this.cartSummaryService.getSummary(this.cartItems).subscribe({
      next: (summary) => {
        this.subtotal = summary.subtotal;
        this.shipping = summary.shipping;
        this.grandTotal = summary.grandTotal;
        this.summaryLoading = false;
      },
      error: () => {
        this.summaryLoading = false;
      }
    });
  }
}
