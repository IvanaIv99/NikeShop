import {Component, OnInit} from "@angular/core";
import {ICartItem} from "../../interfaces/i-cart-item";
import {CartService} from "../../business-logic/services/cart.service";

@Component({
  selector: 'app-cart-table',
  templateUrl: './cart-table.component.html',
  styleUrls: ['./cart-table.component.scss']
})
export class CartTableComponent implements OnInit{

  public cartItems: ICartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.items$.subscribe(items => {
      this.cartItems = items;
    });
  }

  public getTotal(): number {
    return this.cartService.getTotal();
  }

  public clearCart() {
    this.cartService.clearCart();
  }
}
