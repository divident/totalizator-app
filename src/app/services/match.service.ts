import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap, publish, refCount } from 'rxjs/operators';

import { baseURL } from '../shared/baseurl';
import { Match, Page } from '../shared/match';
import { ProcessHttpmsgService } from './process-httpmsg.service'



@Injectable({
  providedIn: 'root'
})


export class MatchService {
 
  match: Match;
  private matchesUrl = 'matches'

  constructor(private http: HttpClient,
    private processMsg: ProcessHttpmsgService) { }

  getMatches(): Observable<Page> {
    const url = `${baseURL}${this.matchesUrl}`;
    return this.http.get<Page>(url)
      .pipe(
        catchError(this.processMsg.handleError<Page>('getMatches'))
      )
  }

  getMatch(id: number): Observable<Match> {
    const url = baseURL + `${this.matchesUrl}/${id}`
    return this.http.get<Match>(url)
      .pipe(
        catchError(this.processMsg.handleError<Match>('getMatch'))
      )
  }

  serachMatches(team='', league='', pageNumber = 0): Observable<Match[]> {
    return this.http.get<Page>(baseURL + this.matchesUrl, {
      params: new HttpParams()
        .set('page', pageNumber.toString())
        .set('team', team)
        .set('league', league)
    }).pipe(
      map(res => res.results)
    )
  }

  getTeams(): Observable<string[]> {
    return this.http.get(baseURL + "teams").pipe(
      map(res => res["teams"]),
      publish(),
      refCount()
    )
  }

  getLeagues(): Observable<string[]> {
    return this.http.get(baseURL + "leagues").pipe(
      map(res => res["leagues"]),
      publish(),
      refCount()
    )
  }
}