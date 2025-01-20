import {EventEmitter, Injectable, Input, Output} from '@angular/core';
import {IProduct} from "../../admin/products/interfaces/i-product";
import * as productsJson from "../../shared/data/products.json";
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {ProductModel} from "../models/product.model";
import { environment } from '../../shared/environment/environment';
import {SizeModel} from "../models/size.model";
import {ColorModel} from "../models/color.model";
import {CategoryModel} from "../models/category.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  productList: IProduct[] = (productsJson as any).default;
  products: ProductModel[];

  addProductToCart(product, event) {
    event.emit(product);
  }
  onSelectedAttribute(value, attribute, product) {
    if(attribute == 'size')  product.selectedSize = value;
    if(attribute == 'color')  product.selectedColor = value;
  }

  getProducts(productId?: any ){
    let url = `${environment.apiUrl}/products`;
    if (productId) {
      url += `?productId=${productId}`;
    }
    return this.httpClient.get<ProductModel[]>(url);
  }

  getProductSizes(productId?: any ){
    let url = `${environment.apiUrl}/products/sizes`;
    if (productId) {
      url += `?productId=${productId}`;
    }

    return this.httpClient.get<SizeModel[]>(url);
  }

  getProductColors(productId?: any){
    let url = `${environment.apiUrl}/products/colors`;
    if (productId) {
      url += `?productId=${productId}`;
    }
    return this.httpClient.get<ColorModel[]>(url);
  }

  getProductCategories(productId?: any){
    let url = `${environment.apiUrl}/products/categories`;
    if (productId) {
      url += `?productId=${productId}`;
    }
    return this.httpClient.get<CategoryModel[]>(url);
  }

  addProduct(data: any){
    return this.httpClient.post<ProductModel>(`${environment.apiUrl}/products/create`, data)
  }

  updateProduct(data: any, productId: any){
    return this.httpClient.post<ProductModel>(`${environment.apiUrl}/products/edit/${productId}`, data)
  }

  deleteProduct(productId: any){
    return this.httpClient.delete<ProductModel>(`${environment.apiUrl}/products/delete/${productId}`)
  }
}
