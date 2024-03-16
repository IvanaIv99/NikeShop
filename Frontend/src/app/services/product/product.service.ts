import {EventEmitter, Injectable, Input, Output} from '@angular/core';
import {Product} from "../../inferfaces/IProduct";
import * as productsJson from "../../data/products.json";
import { HttpClient } from '@angular/common/http'
import {ProductModel} from "../../models/product.model";
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  productList: Product[] = (productsJson as any).default;
  products: ProductModel[];

  addProductToCart(product, event) {
    event.emit(product);
  }
  onSelectedAttribute(value, attribute, product) {
    if(attribute == 'size')  product.selectedSize = value;
    if(attribute == 'color')  product.selectedColor = value;
  }

  getProductsList(){
    return this.httpClient.get<ProductModel[]>(`${environment.apiUrl}/products/getAll`);
  }
}
