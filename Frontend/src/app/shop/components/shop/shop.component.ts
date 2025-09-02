import {Component, OnInit} from '@angular/core';
import { ICartItem } from '../../../cart/interfaces/i-cart-item';
import {CartService} from "../../../cart/business-logic/services/cart.service";
import {ShopService} from "../../business-logic/services/shop.service";
import {BlProductsApiService} from "../../../admin/products/bussiness-logic/api/bl-products-api.service";
import {IProduct} from "../../interfaces/i-product";
import {Observable} from "rxjs";
import {BlProductsRequestService} from "../../../admin/products/bussiness-logic/requests/bl-products-request.service";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {

  protected products: IProduct[];

  constructor(
    public requestService: BlProductsRequestService,
    public cartService: CartService
  ) {
  }

  ngOnInit() {
    this.loadProducts();
  }

  protected addProductToCart(product: any) {
    let item: ICartItem = {
      product: product,
      quantity: 1,
      total: product.price,
      size: product.selectedSize,
      color: product.selectedColor
    };

    this.cartService.addToCart(item);
  }

  private loadProducts(): void
  {
    this.requestService.getAllProducts().subscribe({
      next: (products: IProduct[]) => {
        this.products = products;
      },
      error: (err) => console.error(err)
    });
  }

}
