import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import {BlProductsApiService} from "../api/bl-products-api.service";
import {IProduct} from "../../interfaces/i-product";


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

  delete(product: IProduct): Observable<any> {
    return this.apiService.delete(product);
  }
}
