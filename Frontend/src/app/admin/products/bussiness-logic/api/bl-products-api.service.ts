import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {environment} from "../../../../shared/environment/environment";
import {ISize} from "../../../../shop/interfaces/i-size";
import {IColor} from "../../../../shop/interfaces/i-color";
import {ICategory} from "../../../../shop/interfaces/i-category";
import {IProductsStatistics} from "../../interfaces/i-top-product";
import {IProduct} from "../../../../shop/interfaces/i-product";
import {WebApiService} from "../../../../shared/business-logic/services/api/web-api.service";

@Injectable({
  providedIn: 'root'
})
export class BlProductsApiService {
  constructor(
    public webApiService: WebApiService
  ) {}

  getAll(): Observable<IProduct[]> {
    let url = `${environment.apiUrl}/products`;
    return this.webApiService.get<IProduct[]>(url);
  }

  getOne(id: any): Observable<IProduct> {
    let url = `${environment.apiUrl}/products?productId=${id}`;
    return this.webApiService.get<IProduct>(url);
  }

  delete(product: IProduct): Observable<any> {
    let url = `${environment.apiUrl}/products/${product['id']}`;
    return this.webApiService.delete(url);
  }

  create(data: any): Observable<IProduct> {
    let url = `${environment.apiUrl}/products`;
    return this.webApiService.post<IProduct>(url, data);
  }

  update(id: any, data: any): Observable<any> {
    let url = `${environment.apiUrl}/products/${id}`;
    return this.webApiService.post(url, data);
  }

  getSizes(): Observable<ISize[]> {
    let url = `${environment.apiUrl}/products/sizes`;
    return this.webApiService.get<ISize[]>(url);
  }

  getColors(): Observable<IColor[]> {
    let url = `${environment.apiUrl}/products/colors`;
    return this.webApiService.get<IColor[]>(url);
  }

  getCategories(): Observable<ICategory[]> {
    let url = `${environment.apiUrl}/products/categories`;
    return this.webApiService.get<ICategory[]>(url);
  }

  getProductsStatistics(): Observable<IProductsStatistics> {
    let url = `${environment.apiUrl}/products/stats`;
    return this.webApiService.get<IProductsStatistics>(url);
  }
}
