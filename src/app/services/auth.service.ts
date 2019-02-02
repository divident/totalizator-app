import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap, shareReplay, map, catchError} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ProcessHttpMsgService } from './process-httpmsg.service';
import { User } from '../shared/user';
import { baseURL } from '../shared/baseurl';
import { authKey} from '../shared/config';
import { Router } from '@angular/router';

interface AuthResponse {
  status: string,
  success: string,
  token: string
  user: User
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  private isAuthenticated: Boolean = false;
  username: Subject<string> = new Subject<string>();
  private authToken: string = undefined;
  private authUrl = `${baseURL}rest-auth/`;
  
  constructor(private http: HttpClient,
    private processMsg: ProcessHttpMsgService,
    private router: Router) { }

  storeUserCredentials(credentails: any) {
    console.log('storeUserCredentials', credentails);
    localStorage.setItem(authKey, JSON.stringify(credentails))
    this.useCredentials(credentails)
  }

  useCredentials(credentails: any) {
    this.isAuthenticated = true;
    this.sendUsername(credentails.username)
    this.authToken = credentails.token;
  }

  sendUsername(name: string) {
    console.log("User name: ", name)
    this.username.next(name);
  }

  clearUsername() {
    this.username.next(undefined);
  }

  logIn(user: any): Observable<any> {
    console.log("User: " + JSON.stringify(user))
    return this.http.post<AuthResponse>(this.authUrl + 'login/',
    {'username': user.username, 'password': user.password}).pipe(
      tap(res => console.log(JSON.stringify(res))),
      tap(res => this.storeUserCredentials({username: res.user.username, token: res.token})),
      tap(res => this.sendUsername(res.user.username)),
      map(res => {return {'success': true, 'username': user.username}}),
    )
  
  }

  destroyCredentials(): void {
    this.authToken = undefined;
    this.username.next(undefined);
    this.isAuthenticated = false;
    localStorage.removeItem(authKey)
  }

  logOut() {
    this.destroyCredentials();
    let url = `${baseURL}rest-auth/logout/`
    this.http.post(url, this.getAuthHttpHeader()).subscribe(
      res => this.router.navigate(['/'])
    );
    
  }

  loadUserCredentials() {
    const credentials = JSON.parse(localStorage.getItem(authKey));
    console.log('loadUserCredentials ', credentials);
    if (credentials && credentials.username !== undefined) {
      this.useCredentials(credentials);
    }
  }

  getAuthHttpHeader(): {headers: HttpHeaders}  {
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
      tap(res => console.log(res))
    )
  }

  isLoggedIn(): Boolean {
    return this.isAuthenticated;
  }

  getUsername(): Observable<string> {
    return this.username.asObservable();
  }

  resetPassword(data: any): Observable<any> {
    let resetURL = `${baseURL}rest-auth/password/reset/`
    return this.http.post(resetURL, data).pipe(
      tap(res => console.log(res))
    )
  }
}
