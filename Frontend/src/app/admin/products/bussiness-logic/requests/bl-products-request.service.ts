import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import {BlProductsApiService} from "../api/bl-products-api.service";
import {ISize} from "../../../../shop/interfaces/i-size";
import {IColor} from "../../../../shop/interfaces/i-color";
import {ICategory} from "../../../../shop/interfaces/i-category";
import {ITopProduct} from "../../interfaces/i-top-product";
import {IProduct} from "../../../../shop/interfaces/i-product";


@Injectable({
  providedIn: 'root'
})
export class BlProductsRequestService {

  constructor(
    private apiService: BlProductsApiService,
  ) { }

  getAllProducts(): Observable<IProduct[]> {
    return this.apiService.getAll();
  }

  getOneProduct(id: any): Observable<IProduct> {
    return this.apiService.getOne(id);
  }

  delete(product: IProduct): Observable<any> {
    return this.apiService.delete(product);
  }

  create(data: any): Observable<IProduct> {
    return this.apiService.create(data);
  }

  update(data: any, id: any): Observable<IProduct> {
    return this.apiService.update(id, data);
  }

  getSizes(): Observable<ISize[]> {
    return this.apiService.getSizes();
  }

  getColors(): Observable<IColor[]> {
    return this.apiService.getColors();
  }

  getCategories(): Observable<ICategory[]> {
    return this.apiService.getCategories();
  }

  getTopProducts(): Observable<ITopProduct[]> {
    return this.apiService.getTopProducts();
  }
}
