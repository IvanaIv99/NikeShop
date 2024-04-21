import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { CartItem } from '../../inferfaces/ICartItem';
import {Product} from "../../inferfaces/IProduct";
import {CartService} from "../../services/cart/cart.service";
import {ProductService} from "../../services/product/product.service";
import {ProductModel} from "../../models/product.model";
import {Observable} from "rxjs";

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

    let item: CartItem = {
      id : product.id,
      name: product.name,
      quantity: 1,
      price: product.price,
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
        this.products = data[0];
      },
      error: (e) => console.error(e)
    });
  }

}
