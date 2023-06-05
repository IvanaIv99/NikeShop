import {EventEmitter, Injectable, Input, Output} from '@angular/core';
import {Product} from "../../inferfaces/IProduct";
import * as productsJson from "../../data/products.json";
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor() { }

  productList: Product[] = (productsJson as any).default;
  addProductToCart(product, event) {
    event.emit(product);
  }
  onChangedAttribute(value, product) {
    product.selectedSize = value.target.value;
  }

  getProducts(){
    return this.productList;
  }
}
