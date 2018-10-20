import { Injectable } from '@angular/core';
import { Match } from './shared/match';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { baseURL } from './shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  match: Match;

  private matchesUrl = 'matches'
  
  constructor(private http: HttpClient) {}

  getMatches(): Observable<Match[]> {
    return this.http.get<Match[]>(baseURL + this.matchesUrl)
  }

  getMatch(id: number): Observable<Match> {
    const url = `${this.matchesUrl}/${id}`
    return this.http.get<Match>(baseURL + url)
  }

  serachMatches(term: string): Observable<Match[]> {
    if (!term.trim()) {
      return of([])
    }
    const url = `${this.matchesUrl}/?name=${term}`
    return this.http.get<Match[]>(baseURL + url)
  }
}

