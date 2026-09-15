import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICartItem } from '../../interfaces/i-cart-item';
import { CartService } from '../../business-logic/services/cart.service';
import { CartSummaryService } from '../../business-logic/services/cart-summary.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss'],
    standalone: false
})
export class CartComponent implements OnInit, OnDestroy {

  public cartItems: ICartItem[] = [];
  public allInStock = true;
  private sub?: Subscription;

  constructor(
    private cartService: CartService,
    private cartSummaryService: CartSummaryService
  ) {}

  ngOnInit(): void {
    this.sub = this.cartService.items$.subscribe(items => {
      this.cartItems = items;
      this.revalidateStock();
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  public clearCart(): void {
    this.cartService.clearCart();
  }

  private revalidateStock(): void {
    if (!this.cartItems.length) {
      this.allInStock = true;
      return;
    }

    this.cartSummaryService.getSummary(this.cartItems).subscribe({
      next: (summary) => this.allInStock = summary.allInStock
    });
  }
}
