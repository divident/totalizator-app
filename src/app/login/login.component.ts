import { Component, OnInit, ErrorHandler } from '@angular/core';
import { MatDialogRef} from '@angular/material';
import { AuthService } from '../services/auth.service';
import { ProcessHttpMsgService } from '../services/process-httpmsg.service';
import { ErrorsHandler } from '../errors-handler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [{provide: ErrorHandler, useClass: ErrorsHandler}]
})
export class LoginComponent implements OnInit {

  user = {username: '', password: '', remember: false};
  public errMsg: string;

  constructor(public dialogRef: MatDialogRef<LoginComponent>,
    private authService: AuthService,
    private errorMsg: ProcessHttpMsgService) { }

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
        this.errorMsg.handleError(error);
      })
  }

}