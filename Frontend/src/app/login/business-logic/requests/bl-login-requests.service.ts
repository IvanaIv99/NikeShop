import { Injectable } from '@angular/core';
import { BlLoginApiService } from '../api/bl-login-api.service';
import { Observable } from 'rxjs';
import { ICredentials, ICredentialsResponse } from '../../interfaces/i-credentials';

@Injectable({
  providedIn: 'root'
})
export class BlLoginRequestsService {

  constructor(
    private apiService: BlLoginApiService
  ) { }

  login(dataToSend: ICredentials): Observable<ICredentialsResponse> {
    return this.apiService.login(dataToSend);
  }

}