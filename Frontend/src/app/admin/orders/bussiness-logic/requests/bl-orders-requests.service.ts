import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
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

  public getAllOrders(): Observable<IOrder[]> {
    return this.apiService.getAll();
  }

  public getOneOrder(id: number): Observable<IOrder> {
    return this.apiService.getOne(id);
  }

  public changeStatus(id:number, status: string): Observable<IOrder> {
    return this.apiService.changeStatus(id, status);
  }

  public getTodayStats(): Observable<ITodayStats> {
    return this.apiService.getTodayStats();
  }
}
