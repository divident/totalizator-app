import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import { AuthService } from './auth.service';
import { baseURL } from '../shared/baseurl';
import { catchError } from 'rxjs/operators';
import { Bet } from '../shared/bet';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BetService {

  private betUrl = `${baseURL}bets/`;

  constructor(private http: HttpClient,
    private processMsg: ProcessHttpmsgService,
    private authService: AuthService) { }
  
  postBet(bet: any) {
    let authHeader = this.authService.getAuthHttpHeader();
    console.log('postBet' + JSON.stringify(bet));
    return this.http.post(this.betUrl, bet, authHeader)
      .pipe(
        catchError(this.processMsg.handleError<Bet>('postBet'))
      )
  }

  getBets() : Observable<Bet[]> {
    let authHeader = this.authService.getAuthHttpHeader();
    console.log('getBets');
    return this.http.get<Bet[]>(this.betUrl, authHeader)
      .pipe(
        catchError(this.processMsg.handleError<Bet[]>('getBets'))
      );
  }

  deleteBet(betId: number): Observable<any> {
    let authHeader = this.authService.getAuthHttpHeader();
    console.log('deleteBet');
    return this.http.delete(this.betUrl + betId, authHeader)
      .pipe(
        catchError(this.processMsg.handleError<Bet>('deleteBet'))
      );
  }
}
