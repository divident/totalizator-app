import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule, MatDialogModule, MatSelectModule, MatFormFieldModule, 
  MatInputModule, MatCheckboxModule, MatButtonModule} from '@angular/material';

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

@NgModule({
  declarations: [
    AppComponent,
    MatchesComponent,
    MatchDetailComponent,
    LoginComponent,    
    HeaderComponent, AccountComponent, BetFormComponent,
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
    BrowserAnimationsModule,
    MatButtonModule,
    AppRoutingModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ LoginComponent, ]
})
export class AppModule { }
