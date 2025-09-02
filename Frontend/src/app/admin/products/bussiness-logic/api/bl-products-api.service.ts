import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {environment} from "../../../../shared/environment/environment";
import {ISize} from "../../../../shop/interfaces/i-size";
import {IColor} from "../../../../shop/interfaces/i-color";
import {ICategory} from "../../../../shop/interfaces/i-category";
import {ITopProduct} from "../../interfaces/i-top-product";
import {IProduct} from "../../../../shop/interfaces/i-product";

@Injectable({
  providedIn: 'root'
})
export class BlProductsApiService {
  constructor(
    public http: HttpClient
  ) {}

  getAll(): Observable<IProduct[]> {
    let url = `${environment.apiUrl}/products`;
    return this.http.get<IProduct[]>(url)
      .pipe(map(response => response['data']));
  }

  getOne(id: any): Observable<IProduct> {
    let url = `${environment.apiUrl}/products?productId=${id}`;
    return this.http.get<IProduct>(url);
  }

  delete(product: IProduct): Observable<any> {
    let url = `${environment.apiUrl}/products/delete/${product['id']}`;
    return this.http.delete(url);
  }

  create(data: any): Observable<IProduct> {
    let url = `${environment.apiUrl}/products/create`;
    return this.http.post<IProduct>(url, data);
  }

  update(id: any, data: any): Observable<any> {
    let url = `${environment.apiUrl}/products/delete/${id}`;
    return this.http.post(url, data);
  }

  getSizes(): Observable<ISize[]> {
    let url = `${environment.apiUrl}/products/sizes`;
    return this.http.get<ISize[]>(url);
  }

  getColors(): Observable<IColor[]> {
    let url = `${environment.apiUrl}/products/colors`;
    return this.http.get<IColor[]>(url);
  }

  getCategories(): Observable<ICategory[]> {
    let url = `${environment.apiUrl}/products/categories`;
    return this.http.get<ICategory[]>(url);
  }

  getTopProducts(): Observable<ITopProduct[]> {
    let url = `${environment.apiUrl}/products/stats`;
    return this.http
      .get<{ three_top_selling: ITopProduct[] }>(url)
      .pipe(map(response => response.three_top_selling)
    );
  }
}
