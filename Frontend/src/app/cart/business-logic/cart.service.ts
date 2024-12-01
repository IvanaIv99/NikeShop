import { Injectable } from '@angular/core';
import {CartItem} from "../../shared/inferfaces/ICartItem";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  items = [];

  count = JSON.parse(localStorage.getItem("cartItems")).length;
  simpleObservable = new Subject();
  simpleObservable$ = this.simpleObservable.asObservable();

  updateCartTotal() {
  }

  addProductToCart(item : CartItem) {
    const productExistInCart = this.items?.find(({id}) => id === item.id);
    if (!productExistInCart) {
      this.addToCartIfNotExist(item);
    }else{
      if(productExistInCart.size === item.size && productExistInCart.color === item.color){
        this.items.map(item => {
          if(item.id == productExistInCart.id){
            item.quantity++;
            item.total = item.quantity * item.price;
          }
        })
      }else{
        this.addToCartIfNotExist(item);
      }
    }
    this.saveCart();
    alert("Product added to cart.");

  }

  addToCartIfNotExist(item : CartItem){
    item.quantity = 1;
    this.items?.push(item);
    this.count+=1;
    this.simpleObservable.next(this.count)
  }

  removeProduct(item: CartItem) {
    let index = this.items.findIndex(cartItem => cartItem.id === item.id);
    if (index > -1) {
      this.items.splice(index, 1);
      this.saveCart();
    }
    this.count-=1;
    this.simpleObservable.next(this.count)

  }

  calcTotal() {
    return this.items.reduce(
      (sum, x) => ({
        quantity: 1,
        price: sum.price + x.quantity * x.price
      }),
      { quantity: 1, price: 0 }
    ).price;
  }

  changeSubtotal(item, index, subTotalItems) {
    const qty = item.quantity;
    const amt = item.price;
    const subTotal = amt * qty;
    subTotalItems.toArray()[
      index
      ].nativeElement.innerHTML = subTotal+"$";

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
