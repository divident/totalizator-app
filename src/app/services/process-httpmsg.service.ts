import { Injectable } from '@angular/core';

import { MatDialog } from '@angular/material';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';


@Injectable({
  providedIn: 'root'
})
export class ProcessHttpMsgService {

  constructor(public dialog: MatDialog) { }

  public handleError(error: string) {
    console.log(error)
    this.dialog.open(ErrorDialogComponent, {
      data: {errorMsg: error}, width: '250px'});
  }
}
