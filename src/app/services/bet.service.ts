import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ProcessHttpMsgService } from './process-httpmsg.service';
import { AuthService } from './auth.service';
import { baseURL } from '../shared/baseurl';
import { Bet } from '../shared/bet';
import { Observable } from 'rxjs';
import { SerachService } from '../shared/service-generic';
import { Page } from '../shared/match'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BetService implements SerachService<Bet> {

  private betUrl = `${baseURL}bets/`;

  constructor(private http: HttpClient,
    private processMsg: ProcessHttpMsgService,
    private authService: AuthService) { }
  
  postBet(bet: any) {
    let authHeader = this.authService.getAuthHttpHeader();
    return this.http.post(this.betUrl, bet, authHeader)
  }

  getBets() : Observable<Page<Bet>> {
    let authHeader = this.authService.getAuthHttpHeader();
    return this.http.get<Page<Bet>>(this.betUrl, authHeader)
  }

  deleteBet(betId: number): Observable<any> {
    let authHeader = this.authService.getAuthHttpHeader();
    return this.http.delete(this.betUrl + betId, authHeader)
  }

  searchData(...params: [string, string][]): Observable<[Bet[], number]> {
    let httpParams = new HttpParams();
    for(let [name, val] of params) {
      if(val) {
        httpParams = httpParams.append(name, val);
      }
     }
    let authHeader = this.authService.getAuthHttpHeader();
    let httpData = Object.assign({params: httpParams}, authHeader)
    return this.http.get<Page<Bet>>(this.betUrl, httpData).pipe(
      map(res => {
        let bets = res.results;
        let count = res.count;
        let output: [Bet[], number] = [bets, count]
        return output
      })
    )
  }
}
