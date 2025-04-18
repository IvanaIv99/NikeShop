import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import {BlOrdersApiService} from "../api/bl-orders-api.service";
import {IOrder} from "../../interfaces/i-order";

@Injectable({
  providedIn: 'root'
})
export class BlOrdersRequestsService {

  constructor(
    private apiService: BlOrdersApiService,
  ) { }

  getAllOrders(): Observable<IOrder[]> {
    return this.apiService.getAll();
  }

  getOneOrder(id: number): Observable<IOrder> {
    return this.apiService.getOne(id);
  }
}
