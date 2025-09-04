import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebApiService {
  constructor(
    private httpClient: HttpClient
  ) {}

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    observe: 'response' as const
  };

  public get<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(url, this.httpOptions).pipe(
      map((response: HttpResponse<T>) => this.ReturnResponseData<T>(response)),
      catchError(err => this.handleError(err))
    );
  }

  public post<T>(url: string, model: any): Observable<T> {
    return this.httpClient.post<T>(url, model, this.httpOptions).pipe(
      map((response: HttpResponse<T>) => this.ReturnResponseData<T>(response)),
      catchError(this.handleError)
    );
  }

  public patch<T>(url: string, model: any): Observable<T> {
    return this.httpClient.patch<T>(url, model, this.httpOptions).pipe(
      map((response: HttpResponse<T>) => this.ReturnResponseData<T>(response)),
      catchError(this.handleError)
    );
  }

  public delete<T>(url: string): Observable<T> {
    return this.httpClient.delete<T>(url, this.httpOptions).pipe(
      map((response: HttpResponse<T>) => this.ReturnResponseData<T>(response)),
      catchError(this.handleError)
    );
  }

  private ReturnResponseData<T>(response: HttpResponse<T>): T {
    const body: any = response.body;
    return (body && body.data ? body.data : body) as T;
  }

  private handleError(error: any) {
    return throwError(() => error);
  }
}
