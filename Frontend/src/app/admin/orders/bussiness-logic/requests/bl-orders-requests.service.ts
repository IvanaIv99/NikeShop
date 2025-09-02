import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import {BlOrdersApiService} from "../api/bl-orders-api.service";
import {ITodayStats} from "../../interfaces/i-today-stats";
import {IOrder} from "../../../../process-order/interfaces/i-order";

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

  changeStatus(id:number, status: string): Observable<IOrder> {
    return this.apiService.changeStatus(id, status);
  }

  getTodayStats(): Observable<ITodayStats> {
    return this.apiService.getTodayStats();
  }
}
