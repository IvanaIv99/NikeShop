import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, map } from 'rxjs';
import {IOrderRequest} from "../../interfaces/IOrder";
import {environment} from "../../../shared/environment/environment";

@Injectable({
  providedIn: 'root'
})
export class BlProcessOrderApiService {

  constructor(
    public http: HttpClient
  ) {}

  insert(dataToSend: IOrderRequest): Observable<any> {
    return this.http.post(`${environment.apiUrl}/orders/create`, dataToSend);
  }
}
