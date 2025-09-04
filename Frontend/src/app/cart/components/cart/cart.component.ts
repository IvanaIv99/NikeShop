import { Component, OnInit } from '@angular/core';
import { ICartItem } from "../../interfaces/i-cart-item";
import { CartService } from "../../business-logic/services/cart.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  ngOnInit(): void {
  }

}
