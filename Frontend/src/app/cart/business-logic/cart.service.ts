import { Injectable } from '@angular/core';
import {ICartItem} from "../interfaces/i-cart-item";
import {Subject} from "rxjs";
import {SnackbarService} from "../../shared/services/common/snackbar/SnackbarService";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private snackBarService: SnackbarService
  ) {
  }

  items = [];

  count = JSON.parse(localStorage.getItem("cartItems"))?.length ?? 0;
  simpleObservable = new Subject();
  simpleObservable$ = this.simpleObservable.asObservable();

  updateCartTotal() {
  }

  addProductToCart(item : ICartItem) {
    if(!item.size || !item.color){
      this.snackBarService.showError('Size and color are required.');
      return;
    }

    const productExistInCart = this.items?.find(({id}) => id === item.product.id);
    if (!productExistInCart) {
      this.addToCartIfNotExist(item);
    }else{
      if(productExistInCart.size.id === item.size.id && productExistInCart.color_id === item.color.id){
        this.items.map(item => {
          if(item.product.id == productExistInCart.id){
            item.quantity++;
            item.total = item.quantity * item.price;
          }
        })
      }else{
        this.addToCartIfNotExist(item);
      }
    }
    this.saveCart();
    this.snackBarService.showSuccess('Added to cart.');
  }

  addToCartIfNotExist(item : ICartItem){
    item.quantity = 1;
    this.items?.push(item);
    this.count+=1;
    this.simpleObservable.next(this.count)
  }

  removeProduct(item: ICartItem) {
    let index = this.items.findIndex(cartItem => cartItem.id === item.product.id);
    if (index > -1) {
      this.items.splice(index, 1);
      this.saveCart();
    }
    this.count-=1;
    this.simpleObservable.next(this.count)

  }

  calcTotal(): any {
    return this.items.reduce(
      (sum, x) => ({
        quantity: sum.quantity + x.quantity,
        price: sum.price + x.quantity * x.product.price
      }),
      { quantity: 0, price: 0 }
    ).price;
  }

  changeSubtotal(item, index, subTotalItems) {
    const qty = item.quantity;
    const amt = item.product.price;
    const subTotal = amt * qty;
    subTotalItems.toArray()[index].nativeElement.innerHTML = subTotal+"$";

    item.total = subTotal;
    this.saveCart();
  }

  saveCart() {
    localStorage.setItem('cartItems', JSON.stringify(this.items));
  }

  loadCart() {
    this.items = JSON.parse(localStorage.getItem("cartItems")) ?? [];
  }

  countInCart(){
    return this.simpleObservable$;
  }

  getCartItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    this.saveCart();
    this.count=0;
    this.simpleObservable.next(this.count)

  }

}
