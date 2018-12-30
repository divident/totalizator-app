import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Comment } from '../shared/comment';
import { baseURL } from '../shared/baseurl';
import { ProcessHttpMsgService } from './process-httpmsg.service';
import { AuthService } from './auth.service';

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
    return this.http.get<Comment[]>(url)
  }

  postComment(comment: any) {
    let authHeader = this.authService.getAuthHttpHeader()
    console.log('postComment' + JSON.stringify(comment))
    return this.http.post(this.commentsUrl, comment, authHeader)
  }
}
