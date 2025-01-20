import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, map } from 'rxjs';
import {environment} from "../../environment/environment";
import {IPaymentOption} from "../../inferfaces/IPaymentOption";

@Injectable({
  providedIn: 'root'
})
export class BlPaymentMethodsApiService {

  constructor(
    public http: HttpClient
  ) {}

  getAll(): Observable<any> {
    let url = `${environment.apiUrl}/paymentMethods`;
    return this.http.get<IPaymentOption[]>(url);
  }

}
