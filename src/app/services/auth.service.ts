import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { HttpClient } from '@angular/common/http';

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
  private username: Subject<string> = new Subject<string>();
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
    this.sendUsername(credentails.username);
    this.authToken = credentails.token;
  }

  sendUsername(name: string) {
    console.log('sendUsername ' + name)
    this.username.next(name);
  }

  clearUsername() {
    this.username.next(undefined);
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
    this.clearUsername();
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

  getUsername(): Observable<string> {
    return this.username.asObservable();
  }
}
