import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchesComponent } from './matches/matches.component';
import { MatchDetailComponent } from './match-detail/match-detail.component';
import { AccountComponent } from './account/account.component';
import { BetComponent } from './bet/bet.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginFormComponent } from './login-form/login-form.component'
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { BetHistoryComponent } from './bet-history/bet-history.component';
import { ErrorsComponent } from './errors/errors.component';

const routes: Routes = [
  { path: '', redirectTo: '/matches', pathMatch: 'full'},
  { path: 'matches', component: MatchesComponent},
  { path: 'matches/:id', component: MatchDetailComponent},
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard]},
  { path: 'bets', component: BetComponent, canActivate: [AuthGuard]},
  { path: 'register', component: LoginFormComponent},
  { path: 'reset-password', component: PasswordResetComponent},
  { path: 'bets-history', component: BetHistoryComponent},
  { path: 'error', component: ErrorsComponent},
  { path: '**', component: ErrorsComponent, data: {error: 404}}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }