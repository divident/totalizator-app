import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchesComponent } from './matches/matches.component';
import { MatchDetailComponent } from './match-detail/match-detail.component';
import { AccountComponent } from './account/account.component';
import { BetComponent } from './bet/bet.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginFormComponent } from './login-form/login-form.component'
import { PasswordResetComponent } from './password-reset/password-reset.component';

const routes: Routes = [
  { path: '', redirectTo: '/matches', pathMatch: 'full'},
  { path: 'matches', component: MatchesComponent},
  { path: 'match/:id', component: MatchDetailComponent},
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard]},
  { path: 'bets', component: BetComponent, canActivate: [AuthGuard]},
  { path: 'register', component: LoginFormComponent},
  { path: 'reset-password', component: PasswordResetComponent}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }