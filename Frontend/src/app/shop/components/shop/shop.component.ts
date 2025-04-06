import {Component, OnInit} from '@angular/core';
import { ICartItem } from '../../../cart/interfaces/i-cart-item';
import {CartService} from "../../../cart/business-logic/cart.service";
import {ProductService} from "../../business-logic/product.service";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {

  products: any;

  constructor(
    public productService: ProductService,
    public cartService: CartService
  ) {
  }

  ngOnInit() {
    this.cartService.updateCartTotal();

    this.getProducts();
  }

  addProductToCart(product) {

    let item: ICartItem = {
      product: product,
      quantity: 1,
      total: product.price,
      size: product.selectedSize,
      color: product.selectedColor
    };

    if( !item.size ){
      alert('Color is required.')
    } else if(!item.color){
      alert('Shoe size and color is required.')
    }else{
      this.cartService.addProductToCart(item);
    }

  }
  private getProducts(): any
  {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data['data'];
      },
      error: (e) => console.error(e)
    });
  }

}
