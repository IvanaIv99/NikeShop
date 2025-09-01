import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {environment} from "../../../../shared/environment/environment";
import {IOrder} from "../../interfaces/i-order";
import {ITodayStats} from "../../interfaces/i-today-stats";

@Injectable({
  providedIn: 'root'
})
export class BlOrdersApiService {
  constructor(
    public http: HttpClient
  ) {}

  getAll(): Observable<IOrder[]> {
    let url = `${environment.apiUrl}/orders`;
    return this.http.get<IOrder[]>(url);
  }

  getOne(id: number): Observable<IOrder> {
    let url = `${environment.apiUrl}/orders/`+id;
    return this.http.get<IOrder>(url);
  }

  changeStatus(id: number, status: string): Observable<IOrder> {
    let url = `${environment.apiUrl}/orders/${id}/status`;
    return this.http.post<IOrder>(url, { status });
  }

  getTodayStats(): Observable<ITodayStats> {
    let url = `${environment.apiUrl}/orders/today-stats`;
    return this.http.get<ITodayStats>(url);
  }

}
