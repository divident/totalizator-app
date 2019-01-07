import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap, publish, refCount } from 'rxjs/operators';

import { baseURL } from '../shared/baseurl';
import { Match, Page } from '../shared/match';
import { ProcessHttpMsgService } from './process-httpmsg.service'
import { SerachService } from '../shared/service-generic';



@Injectable({
  providedIn: 'root'
})


export class MatchService  implements SerachService<Match> {
 
  match: Match;
  private matchesUrl = 'matches'

  constructor(private http: HttpClient,
    private processMsg: ProcessHttpMsgService) { }

  getMatches(): Observable<Page<Match>> {
    const url = `${baseURL}${this.matchesUrl}`;
    return this.http.get<Page<Match>>(url)
  }

  getMatch(id: number): Observable<Match> {
    const url = baseURL + `${this.matchesUrl}/${id}`
    return this.http.get<Match>(url) 
  }

  searchData(...params: [string, string][]): Observable<[Match[], number]> {
    let httpParams = new HttpParams()
    for(let [name, val] of params) {
      if(val) {  
        httpParams = httpParams.append(name, val);
        console.log("Setting: ", name, val)
      }
    }
    console.log("HttpParams: ", httpParams)
    return this.http.get<Page<Match>>(baseURL + this.matchesUrl, {
      params: httpParams
    }).pipe(
      map(res => {
        let matches = res.results;
        let count = res.count;
        let output: [Match[], number] = [matches, count]
        return output
      })
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