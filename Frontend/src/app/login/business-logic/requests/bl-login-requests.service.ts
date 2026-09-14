import { Injectable } from '@angular/core';
import { BlLoginApiService } from '../api/bl-login-api.service';
import { Observable } from 'rxjs';
import { ICredentials, ICredentialsResponse } from '../../interfaces/i-credentials';
import { IAdminUser } from '../../../shared/inferfaces/admin/i-admin-user';

@Injectable({
  providedIn: 'root'
})
export class BlLoginRequestsService {

  constructor(
    private apiService: BlLoginApiService
  ) { }

  public login(dataToSend: ICredentials): Observable<ICredentialsResponse> {
    return this.apiService.login(dataToSend);
  }

  public logout(): Observable<any> {
    return this.apiService.logout();
  }

  public getUser(): Observable<IAdminUser> {
    return this.apiService.getUser();
  }
}
