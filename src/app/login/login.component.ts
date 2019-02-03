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
    this.authService.logIn(this.user).subscribe(res => {
          this.dialogRef.close(res)
      });
  }

}