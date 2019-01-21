import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Comment } from '../shared/comment';
import { baseURL } from '../shared/baseurl';
import { ProcessHttpMsgService } from './process-httpmsg.service';
import { AuthService } from './auth.service';
import { Page } from '../shared/match';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient,
    private processMsg: ProcessHttpMsgService,
    private authService: AuthService) { }

  private commentsUrl = baseURL + 'comments/'

  getMatchComments(matchId: number): Observable<Comment[]> {
    const url = `${this.commentsUrl}?match=${matchId}`
    console.log(url)
    return this.http.get<Page<Comment>>(url).pipe(
      map(res => res.results)
    );
  }

  postComment(comment: any): Observable<Comment>{
    let authHeader = this.authService.getAuthHttpHeader()
    console.log('postComment' + JSON.stringify(comment))
    return this.http.post<Comment>(this.commentsUrl, comment, authHeader)
  }
}
