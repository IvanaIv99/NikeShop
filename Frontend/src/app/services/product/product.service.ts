import {EventEmitter, Injectable, Input, Output} from '@angular/core';
import {Product} from "../../inferfaces/IProduct";
import * as productsJson from "../../data/products.json";
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {ProductModel} from "../../models/product.model";
import { environment } from '../../../environment/environment';
import {SizeModel} from "../../models/size.model";
import {ColorModel} from "../../models/color.model";
import {CategoryModel} from "../../models/category.model";

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

    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     "Content-Type": "multipart/form-data",
    //     'Accept': 'application/json',
    //     'Type': 'formData'
    //   })
    // };

    return this.httpClient.post<any>(`${environment.apiUrl}/products/create`, data)
  }

  updateProduct(data: any, productId: any){
    return this.httpClient.post<any>(`${environment.apiUrl}/products/edit/${productId}`, data)
  }
}
