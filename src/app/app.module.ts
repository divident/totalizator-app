import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule, MatDialogModule, MatSelectModule, MatFormFieldModule,
  MatInputModule, MatCheckboxModule, MatListModule, MatButtonModule, MatTableModule, MatDividerModule} from '@angular/material';
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms'

import { AppComponent } from './app.component';
import { MatchesComponent } from './matches/matches.component';
import { HttpClientModule } from '@angular/common/http';
import { MatchDetailComponent } from './match-detail/match-detail.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { AccountComponent } from './account/account.component';
import { BetFormComponent } from './bet-form/bet-form.component';
import { BetComponent } from './bet/bet.component';
import { LoginFormComponent } from './login-form/login-form.component'; 

@NgModule({
  declarations: [
    AppComponent,
    MatchesComponent,
    MatchDetailComponent,
    LoginComponent,    
    HeaderComponent, AccountComponent, BetFormComponent, BetComponent, LoginFormComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatTableModule,
    MatDividerModule,
    MatListModule,
    BrowserAnimationsModule,
    MatButtonModule,
    AppRoutingModule,
    MatSelectModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: '6LcLGHwUAAAAAOFEYtdgPG842FwwtCzGsMjKM8Gf' } as RecaptchaSettings,
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [ LoginComponent, ]
})
export class AppModule { }
