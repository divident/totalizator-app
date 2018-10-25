import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Account } from '../shared/account';
import { baseURL } from '../shared/baseurl';
import { catchError } from 'rxjs/operators';
import { ProcessHttpmsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private accountUrl = `${baseURL}accounts/`

  constructor(private http: HttpClient,
              private processMsg: ProcessHttpmsgService) { }

  getAccount(): Observable<Account> {
    let jwtToken = JSON.parse(localStorage.getItem('JWT')).token;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `JWT ${jwtToken}`
      })
    };
    if (jwtToken) {
      console.log('Jwttoken: ' + jwtToken)
      return this.http.get<Account>(this.accountUrl, httpOptions)
        .pipe(
          catchError(this.processMsg.handleError<Account>('getAccount'))
        )
    } else {
      console.log('Missing jwt token')
    }
  }
}
