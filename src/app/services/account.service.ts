import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../shared/account';
import { Transaction } from '../shared/transaction';
import { baseURL } from '../shared/baseurl';
import { tap} from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Redirect } from '../shared/redirect';
import { ProcessHttpMsgService } from './process-httpmsg.service';
import { SerachService } from '../shared/service-generic';

@Injectable({
  providedIn: 'root'
})
export class AccountService implements SerachService<Transaction> {
  private accountUrl = `${baseURL}accounts/`
  private transactionUrl = `${baseURL}transactions/`
  private chargeUrl = `${baseURL}payment/charge/`

  constructor(private http: HttpClient,
              private processMsg: ProcessHttpMsgService,
              private authService: AuthService) { }

  getAccount(): Observable<Account> {
    let httpOptions = this.authService.getAuthHttpHeader()
    return this.http.get<Account>(this.accountUrl, httpOptions)
  }

  getTransations(): Observable<Transaction[]> {
    let httpOptions = this.authService.getAuthHttpHeader()
    return this.http.get<Transaction[]>(this.transactionUrl, httpOptions)
  }

  performCharge(amount: number): Observable<Redirect> {
    let httpOptions = this.authService.getAuthHttpHeader()
    return this.http.post<Redirect>(this.chargeUrl, {'total_amount': amount}, httpOptions)
      .pipe(
        tap(res => console.log('Charge response ' + res.redirectUri)),
      )
  }

  searchData(...params: [string, string][]): Observable<Transaction[]> {
    let httpParams = new HttpParams();
    for(let [name, val] of params) {
      if(val) {
        httpParams = httpParams.append(name, val);
      }
     }

    let authHeader = this.authService.getAuthHttpHeader();
    let httpData = Object.assign({params: httpParams}, authHeader)
    return this.http.get<Transaction[]>(this.transactionUrl, httpData);
  }
}
