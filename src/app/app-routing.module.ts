import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchesComponent } from './matches/matches.component';
import { MatchDetailComponent } from './match-detail/match-detail.component';
import { AccountComponent } from './account/account.component';

const routes: Routes = [
  { path: '', redirectTo: '/matches', pathMatch: 'full'},
  { path: 'matches', component: MatchesComponent},
  { path: 'match/:id', component: MatchDetailComponent},
  { path: 'account', component: AccountComponent}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }