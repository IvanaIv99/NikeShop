import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "../../../shared/environment/environment";
import { WebApiService } from "../../../shared/business-logic/services/api/web-api.service";
import { ICartItem } from "../../interfaces/i-cart-item";
import { IOrderSummary } from "../../interfaces/i-order-summary";

/**
 * Server-authoritative totals for a set of cart items. The backend re-reads
 * prices and the shipping fee from its own source of truth, so the cart and
 * checkout pages always show what the customer will actually be charged.
 */
@Injectable({
  providedIn: 'root'
})
export class CartSummaryService {

  constructor(private webApiService: WebApiService) {}

  public getSummary(items: ICartItem[]): Observable<IOrderSummary> {
    const orderItems = items.map(item => ({
      variantId: item.variantId,
      quantity: item.quantity
    }));

    return this.webApiService.post<IOrderSummary>(
      `${environment.apiUrl}/orders/summary`,
      { orderItems }
    );
  }
}
