import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-charge-dialog',
  templateUrl: './charge-dialog.component.html',
  styleUrls: ['./charge-dialog.component.css']
})
export class ChargeDialogComponent implements OnInit {

  chargeAmount: number;

  constructor(public dialogRef: MatDialogRef<ChargeDialogComponent>) {}

  ngOnInit() {
  }

  confirm() {
    this.dialogRef.close(this.chargeAmount)
  }
  

}
