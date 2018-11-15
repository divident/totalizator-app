import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {username: '', password: '', remember: false};
  public errMsg: string;

  constructor(public dialogRef: MatDialogRef<LoginComponent>,
    private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log("User: ", this.user);
    this.authService.logIn(this.user)
      .subscribe(res => {
          console.log('LoginComponent: ' + res);
          this.dialogRef.close(res);
      },
      error => {
        console.log(error);
        this.errMsg = error.message
      })
  }

}