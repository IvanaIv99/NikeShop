import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {BlProcessOrderApiService} from "../api/bl-process-order-api.service";
import {IOrderRequest} from "../../interfaces/i-order";

@Injectable({
  providedIn: 'root'
})
export class BlProcessOrderRequestsService {

  constructor(
    private apiService: BlProcessOrderApiService,
  ) { }

  insert(dataToSend: IOrderRequest): Observable<any> {
    return this.apiService.insert(dataToSend);
  }

}
