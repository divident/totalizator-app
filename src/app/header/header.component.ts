import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { MatDialog, MatDialogRef } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  username: string = undefined;
  subscription: Subscription;

  constructor(public dialog: MatDialog,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.subscription = this.authService.getUsername().subscribe(username => {
      this.username = username;
    })
    this.authService.loadUserCredentials();

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openLoginForm() {
    let loginRef = this.dialog.open(LoginComponent, { width: '500px', height: '450px' });

    loginRef.afterClosed()
      .subscribe(_ => {
      });
  }

  logOut() {
    this.username = undefined;
    this.authService.logOut();
  }

}