import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, map } from 'rxjs';
import {environment} from "../../../shared/environment/environment";
import {IOrderRequest} from "../../interfaces/i-order";

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
