import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from "../../../../shared/environment/environment";
import {ITodayStats} from "../../interfaces/i-today-stats";
import {IOrder} from "../../../../process-order/interfaces/i-order";
import {WebApiService} from "../../../../shared/business-logic/services/api/web-api.service";

@Injectable({
  providedIn: 'root'
})
export class BlOrdersApiService {
  constructor(
    public webApiService: WebApiService,
  ) {}

  public getAll(): Observable<IOrder[]> {
    let url = `${environment.apiUrl}/orders`;
    return this.webApiService.get<IOrder[]>(url);
  }

  public getOne(id: number): Observable<IOrder> {
    let url = `${environment.apiUrl}/orders/`+id;
    return this.webApiService.get<IOrder>(url);
  }

  public changeStatus(id: number, status: string): Observable<IOrder> {
    let url = `${environment.apiUrl}/orders/${id}/status`;
    return this.webApiService.patch<IOrder>(url, { status });
  }

  public getTodayStats(): Observable<ITodayStats> {
    let url = `${environment.apiUrl}/orders/today-stats`;
    return this.webApiService.get<ITodayStats>(url);
  }

}
