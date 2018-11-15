import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { baseURL } from '../shared/baseurl';
import { Match } from '../shared/match';
import { ProcessHttpmsgService } from './process-httpmsg.service'

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  match: Match;

  private matchesUrl = 'matches'

  constructor(private http: HttpClient,
    private processMsg: ProcessHttpmsgService) { }

  getMatches(): Observable<Match[]> {
    const url = `${baseURL}${this.matchesUrl}`;
    return this.http.get<Match[]>(url)
      .pipe(
        catchError(this.processMsg.handleError<Match[]>('getMatches'))
      )
  }

  getMatch(id: number): Observable<Match> {
    const url = baseURL + `${this.matchesUrl}/${id}`
    return this.http.get<Match>(url)
      .pipe(
        catchError(this.processMsg.handleError<Match>('getMatch'))
      )
  }

  serachMatches(term: string): Observable<Match[]> {
    if (!term.trim()) {
      return of([])
    }
    const url = baseURL + `${this.matchesUrl}/?name=${term}`
    return this.http.get<Match[]>(url)
      .pipe(
        catchError(this.processMsg.handleError<Match[]>('searchMatches'))
      )
  }
}

