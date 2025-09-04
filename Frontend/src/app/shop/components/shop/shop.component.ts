import {Component, OnInit} from '@angular/core';
import { ICartItem } from '../../../cart/interfaces/i-cart-item';
import {CartService} from "../../../cart/business-logic/services/cart.service";
import {IProduct} from "../../interfaces/i-product";
import {BlProductsRequestService} from "../../../admin/products/bussiness-logic/requests/bl-products-request.service";
import {SnackbarService} from "../../../shared/business-logic/services/common/snackbar/snackbar.service";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {

  protected products: IProduct[];

  constructor(
    public requestService: BlProductsRequestService,
    public cartService: CartService,
    private snackbarService: SnackbarService
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
      next: (products: IProduct[]) => this.products = products,
      error: (err) => this.snackbarService.showError("Error loading products.")
    });
  }

}
