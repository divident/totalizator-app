import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { delay } from 'q';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  
  resetData = {email: ""};
  public errMsg: string;

  constructor(private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log("Email ", this.resetData)
    this.authService.resetPassword(this.resetData)
      .subscribe(res => {
        this.snackBar.open("Email został wyslany", "", {duration: 1000});
        delay(2000);
        this.router.navigate(['/matches']);
       });
  }
}
