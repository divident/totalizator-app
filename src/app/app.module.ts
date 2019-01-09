import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatToolbarModule, MatDialogModule, MatSelectModule, MatFormFieldModule, MatTabsModule, MatSlideToggleModule,
  MatInputModule, MatCheckboxModule, MatListModule, MatButtonModule, MatTableModule, MatDividerModule,
  MatAutocompleteModule, MatSnackBarModule, MatDatepickerModule, MatNativeDateModule
} from '@angular/material';
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
import { FlexLayoutModule } from "@angular/flex-layout";
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { StatusPipe } from './status.pipe';
import { BetHistoryComponent } from './bet-history/bet-history.component';
import { ErrorsHandler } from './errors-handler';
import { ErrorsComponent } from './errors/errors.component';
import { ChargeDialogComponent } from './charge-dialog/charge-dialog.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { DateFormComponent } from './date-form/date-form.component';

@NgModule({
  declarations: [
    AppComponent,
    MatchesComponent,
    MatchDetailComponent,
    LoginComponent,
    HeaderComponent, AccountComponent, BetFormComponent, BetComponent, LoginFormComponent, PasswordResetComponent, ErrorDialogComponent, StatusPipe, BetHistoryComponent, ErrorsComponent, ChargeDialogComponent, DateFormComponent 
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
    MatTabsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    AppRoutingModule,
    MatSelectModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    FlexLayoutModule,
    MatCardModule,
    MatGridListModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    {
     provide: ErrorHandler,
     useClass: ErrorsHandler
    },
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: '6LcLGHwUAAAAAOFEYtdgPG842FwwtCzGsMjKM8Gf' } as RecaptchaSettings,
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent, ErrorDialogComponent, ChargeDialogComponent]
})
export class AppModule { }
