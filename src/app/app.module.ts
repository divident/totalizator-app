import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatButtonModule} from '@angular/material';

import { AppComponent } from './app.component';
import { MatchesComponent } from './matches/matches.component';
import { HttpClientModule } from '@angular/common/http';
import { MatchDetailComponent } from './match-detail/match-detail.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { AccountComponent } from './account/account.component'; 

@NgModule({
  declarations: [
    AppComponent,
    MatchesComponent,
    MatchDetailComponent,
    LoginComponent,    
    HeaderComponent, AccountComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatToolbarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatButtonModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ LoginComponent, ]
})
export class AppModule { }
