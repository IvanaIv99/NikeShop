import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICredentials, ICredentialsResponse } from '../../interfaces/i-credentials';
import {environment} from "../../../shared/environment/environment";
import {WebApiService} from "../../../shared/business-logic/services/api/web-api.service";
import {IAdminUser} from "../../../shared/inferfaces/admin/i-admin-user";

@Injectable({
  providedIn: 'root'
})
export class BlLoginApiService {

  constructor(
    public webApiService: WebApiService
  ) {}

  public login(dataToSend: ICredentials): Observable<ICredentialsResponse> {
    return this.webApiService.post<ICredentialsResponse>(`${environment.apiUrl}/auth/login`, dataToSend);
  }

  public logout(): Observable<any> {
    return this.webApiService.post(`${environment.apiUrl}/auth/logout`, []);
  }

  public getUser(): Observable<IAdminUser> {
    return this.webApiService.get<IAdminUser>(`${environment.apiUrl}/user`);
  }

}
