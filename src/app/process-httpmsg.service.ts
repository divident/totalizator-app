import { Injectable } from '@angular/core';

import {Observable, of} from 'rxjs'
import {catchError, map, tap} from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class ProcessHttpmsgService {

  constructor() { }

  public handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
