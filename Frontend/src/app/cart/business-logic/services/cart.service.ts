import { Injectable } from '@angular/core';
import { ICartItem } from "../../interfaces/i-cart-item";
import { BehaviorSubject } from "rxjs";
import { SnackbarService } from "../../../shared/business-logic/services/common/snackbar/SnackbarService";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private items: ICartItem[] = [];

  private countSubject = new BehaviorSubject<number>(0);
  count$ = this.countSubject.asObservable();

  private itemsSubject = new BehaviorSubject<ICartItem[]>([]);
  items$ = this.itemsSubject.asObservable();

  constructor(private snackBarService: SnackbarService) {
    this.loadCart();
  }

  addToCart(item: ICartItem) {
    if (!item.size || !item.color) {
      this.snackBarService.showError('Size and color are required.');
      return;
    }

    const existingItem = this.items.find(cartItem =>
      cartItem.product.id === item.product.id &&
      cartItem.size.id === item.size.id &&
      cartItem.color.id === item.color.id
    );

    if (existingItem) {
      existingItem.quantity += 1;
      existingItem.total = existingItem.quantity * existingItem.product.price;
    } else {
      item.quantity = 1;
      item.total = item.product.price;
      this.items.push(item);
    }

    this.updateCart();
    this.snackBarService.showSuccess('Added to cart.');
  }

  public removeFromCart(item: ICartItem) {
    this.items = this.items.filter(cartItem =>
      !(cartItem.product.id === item.product.id &&
        cartItem.size.id === item.size.id &&
        cartItem.color.id === item.color.id)
    );
    this.updateCart();
  }

  public getTotal(): number {
    return this.items.reduce((sum, item) => sum + item.quantity * item.product.price, 0);
  }

  public clearCart() {
    this.items = [];
    this.updateCart();
  }

  public getCartItems(): ICartItem[] {
    return [...this.items];
  }

  public saveCart() {
    localStorage.setItem('cartItems', JSON.stringify(this.items));
  }

  public loadCart() {
    this.items = JSON.parse(localStorage.getItem('cartItems') || '[]');
    this.countSubject.next(this.items.length);
    this.itemsSubject.next([...this.items]);
  }

  public updateCart() {
    this.saveCart();
    this.countSubject.next(this.items.length);
    this.itemsSubject.next([...this.items]);
  }
}
