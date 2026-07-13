import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../../../shared/environment/environment";
import {ITodayStats} from "../../interfaces/i-today-stats";
import {IDashboardChart} from "../../interfaces/i-dashboard-chart";
import {IOrder} from "../../../../process-order/interfaces/i-order";
import {WebApiService} from "../../../../shared/business-logic/services/api/web-api.service";
import {IOrderListParams, IPaginated, toQueryString} from "../../../../shared/interfaces/i-paginated";

@Injectable({
  providedIn: 'root'
})
export class BlOrdersApiService {
  constructor(
    public webApiService: WebApiService,
    private http: HttpClient,
  ) {}

  public getAll(params: IOrderListParams = {}): Observable<IPaginated<IOrder>> {
    let url = `${environment.apiUrl}/orders${toQueryString(params)}`;
    return this.webApiService.get<IPaginated<IOrder>>(url);
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

  public getChart(): Observable<IDashboardChart> {
    let url = `${environment.apiUrl}/orders/chart`;
    return this.webApiService.get<IDashboardChart>(url);
  }

  public downloadPdf(id: number): Observable<Blob> {
    let url = `${environment.apiUrl}/orders/${id}/pdf`;
    return this.http.get(url, { responseType: 'blob' });
  }

}
