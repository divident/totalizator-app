import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { baseURL } from '../shared/baseurl';
import { map } from "rxjs/operators";

interface AuthResponse {
  status: string,
  success: string,
  token: string
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

  private tokenKey = 'JWT';
  private isAuthenticated: Boolean = false;
  public username: string = undefined;
  private authToken: string = undefined;
  private authUrl = `${baseURL}rest-auth/`;

  constructor(private http: HttpClient) { }

  storeUserCredentials(credentails: any) {
    console.log('storeUserCredentials', credentails);
    localStorage.setItem(this.tokenKey, JSON.stringify(credentails))
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
      map(res => {
        this.storeUserCredentials({username: user.username, token: res.token});
        return {'success': true, 'username': user.username};
      }) 
    )
  }

  destroyCredentials(): void {
    this.authToken = undefined;
    this.username = undefined;
    this.isAuthenticated = false;
    localStorage.removeItem(this.tokenKey)
  }

  logOut() {
    this.destroyCredentials();
  }

  loadUserCredentials() {
    const credentials = JSON.parse(localStorage.getItem(this.tokenKey));
    console.log('loadUserCredentials ', credentials);
    if (credentials && credentials.username !== undefined) {
      this.useCredentials(credentials);
    }
  }

  getAuthHttpHeader(): {headers: HttpHeaders}  {
    // TODO redirect to login page if there is no token
    let jwtToken = JSON.parse(localStorage.getItem('JWT'));
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
}
