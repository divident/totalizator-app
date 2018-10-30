import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Account } from '../shared/account';
import { Transaction } from '../shared/transaction';
import { baseURL } from '../shared/baseurl';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { ProcessHttpmsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private accountUrl = `${baseURL}accounts/`
  private transactionUrl = `${baseURL}transactions/`

  constructor(private http: HttpClient,
              private processMsg: ProcessHttpmsgService,
              private authService: AuthService) { }

  getAccount(): Observable<Account> {
    let httpOptions = this.authService.getAuthHttpHeader()
    return this.http.get<Account>(this.accountUrl, httpOptions)
      .pipe(
          catchError(this.processMsg.handleError<Account>('getAccount'))
      )
  }

  getTranstations(): Observable<Transaction> {
    let httpOptions = this.authService.getAuthHttpHeader()
    return this.http.get<Transaction>(this.transactionUrl, httpOptions)
      .pipe(
        catchError(this.processMsg.handleError<Transaction>('getTransaction'))
      )
  }
}
