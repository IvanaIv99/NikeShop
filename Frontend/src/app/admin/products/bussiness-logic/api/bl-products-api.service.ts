import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {environment} from "../../../../shared/environment/environment";
import {IProduct} from "../../interfaces/i-product";
import {SizeModel} from "../../../../shop/models/size.model";
import {ColorModel} from "../../../../shop/models/color.model";
import {CategoryModel} from "../../../../shop/models/category.model";
import {ProductModel} from "../../../../shop/models/product.model";

@Injectable({
  providedIn: 'root'
})
export class BlProductsApiService {
  constructor(
    public http: HttpClient
  ) {}

  getAll(): Observable<IProduct[]> {
    let url = `${environment.apiUrl}/products`;
    return this.http.get<IProduct[]>(url);
  }

  getOne(id: any): Observable<IProduct> {
    let url = `${environment.apiUrl}/products?productId=${id}`;
    return this.http.get<IProduct>(url);
  }

  delete(product: IProduct): Observable<any> {
    let url = `${environment.apiUrl}/products/delete/${product['id']}`;
    return this.http.delete(url);
  }

  create(data: any): Observable<ProductModel> {
    let url = `${environment.apiUrl}/products/create`;
    return this.http.post<ProductModel>(url, data);
  }

  update(id: any, data: any): Observable<any> {
    let url = `${environment.apiUrl}/products/delete/${id}`;
    return this.http.post(url, data);
  }

  getSizes(): Observable<SizeModel[]> {
    let url = `${environment.apiUrl}/products/sizes`;
    return this.http.get<SizeModel[]>(url);
  }

  getProductSizes(id: any): Observable<SizeModel> {
    let url = `${environment.apiUrl}/products/sizes?productId=${id}`;
    return this.http.get<SizeModel>(url);
  }

  getColors(): Observable<ColorModel[]> {
    let url = `${environment.apiUrl}/products/colors`;
    return this.http.get<ColorModel[]>(url);
  }

  getProductColors(id: any): Observable<ColorModel> {
    let url = `${environment.apiUrl}/products/colors?productId=${id}`;
    return this.http.get<ColorModel>(url);
  }

  getCategories(): Observable<CategoryModel[]> {
    let url = `${environment.apiUrl}/products/categories`;
    return this.http.get<CategoryModel[]>(url);
  }

  getProductCategories(id: any): Observable<CategoryModel> {
    let url = `${environment.apiUrl}/products/categories?productId=${id}`;
    return this.http.get<CategoryModel>(url);
  }
}
