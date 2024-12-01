import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICredentials, ICredentialsResponse } from '../../interfaces/i-credentials';

@Injectable({
  providedIn: 'root'
})
export class BlLoginApiService {

  constructor(
    public http: HttpClient
  ) {}

  login(dataToSend: ICredentials): Observable<ICredentialsResponse> {
    return this.http.get<ICredentialsResponse>("assets/jsons/credentials.json");
  }

}
