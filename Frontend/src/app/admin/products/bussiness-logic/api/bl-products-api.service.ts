import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from "../../../../shared/environment/environment";
import {ISize} from "../../../../shop/interfaces/i-size";
import {IColor} from "../../../../shop/interfaces/i-color";
import {ICategory} from "../../../../shop/interfaces/i-category";
import {IProductsStatistics} from "../../interfaces/i-top-product";
import {IProduct} from "../../../../shop/interfaces/i-product";
import {WebApiService} from "../../../../shared/business-logic/services/api/web-api.service";
import {IListParams, IPaginated, toQueryString} from "../../../../shared/interfaces/i-paginated";

@Injectable({
  providedIn: 'root'
})
export class BlProductsApiService {
  constructor(
    public webApiService: WebApiService
  ) {}

  getAll(params: IListParams = {}): Observable<IPaginated<IProduct>> {
    let url = `${environment.apiUrl}/products${toQueryString(params)}`;
    return this.webApiService.get<IPaginated<IProduct>>(url);
  }

  getOne(id: any): Observable<IProduct> {
    let url = `${environment.apiUrl}/products/${id}`;
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
    if (data instanceof FormData) {
      data.append('_method', 'PUT');
      return this.webApiService.post(url, data);
    }
    return this.webApiService.put(url, data);
  }

  getSizes(): Observable<ISize[]> {
    let url = `${environment.apiUrl}/sizes`;
    return this.webApiService.get<ISize[]>(url);
  }

  getColors(): Observable<IColor[]> {
    let url = `${environment.apiUrl}/colors`;
    return this.webApiService.get<IColor[]>(url);
  }

  getCategories(): Observable<ICategory[]> {
    let url = `${environment.apiUrl}/categories`;
    return this.webApiService.get<ICategory[]>(url);
  }

  getProductsStatistics(): Observable<IProductsStatistics> {
    let url = `${environment.apiUrl}/products/stats`;
    return this.webApiService.get<IProductsStatistics>(url);
  }
}
