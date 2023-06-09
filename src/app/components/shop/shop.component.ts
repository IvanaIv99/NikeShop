import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { CartItem } from '../../inferfaces/ICartItem';
import {Product} from "../../inferfaces/IProduct";
import {CartService} from "../../services/cart/cart.service";
import {ProductService} from "../../services/product/product.service";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {

  productList : Product[];

  constructor(
    public productService: ProductService,
    public cartService: CartService
  ) {
  }

  ngOnInit() {
    this.cartService.updateCartTotal();
    this.productList = this.productService.getProducts();
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


}
