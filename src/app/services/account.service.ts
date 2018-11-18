import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http'
import { Account } from '../shared/account';
import { Transaction } from '../shared/transaction';
import { baseURL } from '../shared/baseurl';
import { catchError, tap} from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Redirect } from '../shared/redirect';
import { ProcessHttpmsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private accountUrl = `${baseURL}accounts/`
  private transactionUrl = `${baseURL}transactions/`
  private chargeUrl = `${baseURL}payment/charge/`

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

  getTransations(): Observable<Transaction[]> {
    let httpOptions = this.authService.getAuthHttpHeader()
    return this.http.get<Transaction[]>(this.transactionUrl, httpOptions)
      .pipe(
        catchError(this.processMsg.handleError<Transaction[]>('getTransaction'))
      )
  }

  performCharge(amount: number): Observable<Redirect> {
    let httpOptions = this.authService.getAuthHttpHeader()
    return this.http.post<Redirect>(this.chargeUrl, {'total_amount': amount}, httpOptions)
      .pipe(
        tap(res => console.log('Charge response ' + res.redirectUri)),
        catchError(this.processMsg.handleError<Redirect>('performCharge'))
      )
  }
}
