import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICredentials, ICredentialsResponse } from '../../interfaces/i-credentials';
import {environment} from "../../../shared/environment/environment";

@Injectable({
  providedIn: 'root'
})
export class BlLoginApiService {

  constructor(
    public http: HttpClient
  ) {}

  login(dataToSend: ICredentials): Observable<ICredentialsResponse> {
    return this.http.post<ICredentialsResponse>(`${environment.apiUrl}/auth/login`, dataToSend);
  }

  logout(): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/logout`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
      }
    });
  }

}
