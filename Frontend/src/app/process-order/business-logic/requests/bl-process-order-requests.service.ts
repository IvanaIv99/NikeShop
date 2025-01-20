import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import {BlProcessOrderApiService} from "../api/bl-process-order-api.service";
import {BlPaymentMethodsApiService} from "../../../shared/business-logic/api/bl-payment-methods-api.service";
import {IOrderRequest} from "../../interfaces/IOrder";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BlProcessOrderRequestsService {

  constructor(
    private apiService: BlProcessOrderApiService,
    private paymentOptionsApiService: BlPaymentMethodsApiService
  ) { }

  insert(dataToSend: IOrderRequest): Observable<any> {
    return this.apiService.insert(dataToSend);
  }

}
