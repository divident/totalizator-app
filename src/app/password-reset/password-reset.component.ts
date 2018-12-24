import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  
  resetData = {email: ""};
  public errMsg: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log("Email ", this.resetData)
    this.authService.resetPassword(this.resetData)
      .subscribe(res => {
        console.log("ResetPassword: " + res);
      },
      error => {
        console.log(error);
        this.errMsg = error.message;
      })
  }
}
