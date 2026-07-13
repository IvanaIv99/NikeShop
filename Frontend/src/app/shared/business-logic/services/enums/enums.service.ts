import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from "../../../environment/environment";
import { WebApiService } from "../api/web-api.service";
import { IEnumOption, IEnums } from "../../../interfaces/i-enums";

/**
 * Backend is the single source of truth for order/payment enum values and
 * their labels. Fetched once and cached, so dropdowns stay in sync with the
 * server without a frontend redeploy when an option is added or removed.
 */
@Injectable({
  providedIn: 'root'
})
export class EnumsService {

  private enums$?: Observable<IEnums>;

  constructor(private webApiService: WebApiService) {}

  public getEnums(): Observable<IEnums> {
    if (!this.enums$) {
      this.enums$ = this.webApiService
        .get<IEnums>(`${environment.apiUrl}/orders/enums`)
        .pipe(shareReplay(1));
    }
    return this.enums$;
  }

  public getOrderStatuses(): Observable<IEnumOption[]> {
    return this.getEnums().pipe(map(e => e.orderStatuses));
  }

  public getPaymentMethods(): Observable<IEnumOption[]> {
    return this.getEnums().pipe(map(e => e.paymentMethods));
  }
}
