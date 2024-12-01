import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './web-api.service';

const apiUrl = "http://localhost:8080/";

let httpLink = {
  getAllProducts: apiUrl + "/api/products/getAll",
  deleteProductById: apiUrl + "/api/products/deleteProductsById",
  getProductDetailsById: apiUrl + "/api/product/getProductsDetailById",
  saveProduct: apiUrl + "/api/product/saveProduct"
}

@Injectable({
  providedIn: 'root'
})

export class HttpProviderService {
  constructor(private webApiService: WebApiService) { }

  public getAllProducts(): Observable<any> {
    return this.webApiService.get(httpLink.getAllProducts);
  }
  public deleteProductsById(model: any): Observable<any> {
    return this.webApiService.post(httpLink.deleteProductById + '?ProductsId=' + model, "");
  }
  public getProductsDetailById(model: any): Observable<any> {
    return this.webApiService.get(httpLink.getProductDetailsById + '?ProductsId=' + model);
  }
  public saveProducts(model: any): Observable<any> {
    return this.webApiService.post(httpLink.saveProduct, model);
  }
}
