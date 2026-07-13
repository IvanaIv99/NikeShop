import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {BlOrdersApiService} from "../api/bl-orders-api.service";
import {ITodayStats} from "../../interfaces/i-today-stats";
import {IDashboardChart} from "../../interfaces/i-dashboard-chart";
import {IOrder} from "../../../../process-order/interfaces/i-order";
import {IOrderListParams, IPaginated} from "../../../../shared/interfaces/i-paginated";

@Injectable({
  providedIn: 'root'
})
export class BlOrdersRequestsService {

  constructor(
    private apiService: BlOrdersApiService,
  ) { }

  public getAllOrders(params: IOrderListParams = {}): Observable<IPaginated<IOrder>> {
    return this.apiService.getAll(params);
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

  public getChart(): Observable<IDashboardChart> {
    return this.apiService.getChart();
  }

  public downloadPdf(id: number): Observable<Blob> {
    return this.apiService.downloadPdf(id);
  }
}
