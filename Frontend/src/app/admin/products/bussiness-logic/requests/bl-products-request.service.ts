import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import {BlProductsApiService} from "../api/bl-products-api.service";
import {IProduct} from "../../interfaces/i-product";
import {SizeModel} from "../../../../shop/models/size.model";
import {environment} from "../../../../shared/environment/environment";
import {ColorModel} from "../../../../shop/models/color.model";
import {CategoryModel} from "../../../../shop/models/category.model";
import {ProductModel} from "../../../../shop/models/product.model";
import {ITopProduct} from "../../interfaces/i-top-product";


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

  create(data: any): Observable<ProductModel> {
    return this.apiService.create(data);
  }

  update(data: any, id: any): Observable<ProductModel> {
    return this.apiService.update(id, data);
  }

  getSizes(): Observable<SizeModel[]> {
    return this.apiService.getSizes();
  }

  getColors(): Observable<ColorModel[]> {
    return this.apiService.getColors();
  }

  getCategories(): Observable<CategoryModel[]> {
    return this.apiService.getCategories();
  }

  getTopProducts(): Observable<ITopProduct[]> {
    return this.apiService.getTopProducts();
  }
}
