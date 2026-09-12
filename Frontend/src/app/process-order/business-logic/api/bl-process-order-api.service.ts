import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from "../../../shared/environment/environment";
import {IOrder, IOrderRequest} from "../../interfaces/i-order";
import {WebApiService} from "../../../shared/business-logic/services/api/web-api.service";

@Injectable({
  providedIn: 'root'
})
export class BlProcessOrderApiService {

  constructor(
    private webApiService: WebApiService,
  ) {}

  public insert(dataToSend: IOrderRequest): Observable<IOrder> {
    return this.webApiService.post<IOrder>(`${environment.apiUrl}/orders/create`, dataToSend);
  }
}
