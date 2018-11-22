import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap, shareReplay, map, catchError} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ProcessHttpmsgService } from './process-httpmsg.service';
import { User } from '../shared/user';
import { baseURL } from '../shared/baseurl';
import { authKey} from '../shared/config';

interface AuthResponse {
  status: string,
  success: string,
  token: string
  user: User
};

interface JWTResponse {
  status: string,
  success: string,
  user: any
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  private isAuthenticated: Boolean = false;
  public username: string = undefined;
  private authToken: string = undefined;
  private authUrl = `${baseURL}rest-auth/`;

  constructor(private http: HttpClient,
    private processMsg: ProcessHttpmsgService) { }

  storeUserCredentials(credentails: any) {
    console.log('storeUserCredentials', credentails);
    localStorage.setItem(authKey, JSON.stringify(credentails))
    this.useCredentials(credentails)
  }

  useCredentials(credentails: any) {
    this.isAuthenticated = true;
    this.username = credentails.username;
    this.authToken = credentails.token;
  }


  logIn(user: any): Observable<any> {
    return this.http.post<AuthResponse>(this.authUrl + 'login/',
    {'username': user.username, 'password': user.password}).pipe(
      tap(res => console.log(JSON.stringify(res))),
      tap(res => this.storeUserCredentials({username: res.user.username, token: res.token})),
      map(res => res.user.username),
      shareReplay()
    )
  
  }

  destroyCredentials(): void {
    this.authToken = undefined;
    this.username = undefined;
    this.isAuthenticated = false;
    localStorage.removeItem(authKey)
  }

  logOut() {
    this.destroyCredentials();
  }

  loadUserCredentials() {
    const credentials = JSON.parse(localStorage.getItem(authKey));
    console.log('loadUserCredentials ', credentials);
    if (credentials && credentials.username !== undefined) {
      this.useCredentials(credentials);
    }
  }

  getAuthHttpHeader(): {headers: HttpHeaders}  {
    // TODO redirect to login page if there is no token
    let jwtToken = JSON.parse(localStorage.getItem(authKey));
    if (jwtToken == undefined) {
        jwtToken = ''
    } else {
      jwtToken = jwtToken.token;
    }
    return {headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `JWT ${jwtToken}`
      })
    };
  }

  registerUser(data: any): Observable<any> {
    let registerURL = `${baseURL}rest-auth/registration/`
    return this.http.post(registerURL, data.value).pipe(
      tap(res => console.log(res)),
      catchError(this.processMsg.handleError<any>('register'))
    )
  }
}
