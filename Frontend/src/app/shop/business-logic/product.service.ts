import {EventEmitter, Injectable, Input, Output} from '@angular/core';
import {IProduct} from "../../admin/products/interfaces/i-product";
import * as productsJson from "../../shared/data/products.json";
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {ProductModel} from "../models/product.model";
import { environment } from '../../shared/environment/environment';
import {SizeModel} from "../models/size.model";
import {ColorModel} from "../models/color.model";
import {CategoryModel} from "../models/category.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: ProductModel[];

  addProductToCart(product, event) {
    event.emit(product);
  }

  onSelectedAttribute(value, attribute, product) {
    if(attribute == 'size')  product.selectedSize = value;
    if(attribute == 'color')  product.selectedColor = value;
  }
}
