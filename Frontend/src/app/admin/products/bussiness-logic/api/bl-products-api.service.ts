import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {environment} from "../../../../shared/environment/environment";
import {IProduct} from "../../interfaces/i-product";

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

  delete(product: IProduct): Observable<any> {
    let url = `${environment.apiUrl}/products/delete/${product['id']}`;
    return this.http.delete(url);
  }
}
