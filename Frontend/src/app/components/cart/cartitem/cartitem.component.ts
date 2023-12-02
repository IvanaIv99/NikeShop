import {Component, OnInit, Input, EventEmitter, Output, ViewChildren, QueryList, ElementRef} from '@angular/core';
import {CartItem} from "../../../inferfaces/ICartItem";
import {CartService} from "../../../services/cart/cart.service";
@Component({
  selector: 'tr[app-cart-item]',
  templateUrl: './cartitem.component.html',
  styleUrls: ['./cartitem.component.scss'],

})
export class CartItemComponent  implements OnInit {

  @Input() cartItem: CartItem;
  @Input() index: number;

  @Output() productRemoved = new EventEmitter();

  @ViewChildren("subTotalWrap") subTotalItems: QueryList<ElementRef>;

  constructor(
    private cartService: CartService
  ) {}

  removeProduct(cartItem: CartItem) {
    this.cartService.removeProduct(cartItem);
  }

  changeSubtotal(item, index) {
    this.cartService.changeSubtotal(item,index, this.subTotalItems);
  }

  ngOnInit() {}

}
