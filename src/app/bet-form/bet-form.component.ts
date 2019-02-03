import { Component, OnInit, Input, ErrorHandler } from '@angular/core';
import { Bet } from '../shared/bet';
import { Match } from '../shared/match';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BetService } from '../services/bet.service';
import { ProcessHttpMsgService } from '../services/process-httpmsg.service';
import { MatSnackBar} from '@angular/material';
import { ErrorsHandler } from '../errors-handler';

@Component({
  selector: 'app-bet-form',
  templateUrl: './bet-form.component.html',
  styleUrls: ['./bet-form.component.css'],
  providers: [{provide: ErrorHandler, useClass: ErrorsHandler}]
})

export class BetFormComponent implements OnInit {
  match: Match;
  betForm: FormGroup;

  model = new Bet();
  teams = undefined;
  currentBetRate: number;
  winValue: number;
  available: boolean;

  constructor(private formBuilder: FormBuilder,
    private betService: BetService,
    private errorMsg: ProcessHttpMsgService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  createForm(): void {
    this.teams = [this.match.team_one, this.match.team_two, 'Remis']
    this.betForm = this.formBuilder.group({
      price: 5,
      picked_team: 0
    });
    this.available = this.match.score_team_one == -1 ? true : false;
    this.currentBetRate = this.match.team_one_win_exchange;
    this.winValue = <number>(this.betForm.get("price").value) * this.currentBetRate;
    this.onChanges();
  }

  onSubmit() {
    this.betForm.value['match_id'] = this.match.id;
    this.betService.postBet(this.betForm.value)
      .subscribe(bet => {
        if (bet) {
          this.snackBar.open("Utworzono zakład", "", {
            duration: 1000,
            panelClass: 'green-snackbar'})
        }
       })
  }

  getTeamIndex(team: string): number {
    return this.teams.indexOf(team)
  }

  onChanges(): void {
    this.betForm.get('price').valueChanges.subscribe(price => {
      this.winValue = price * this.currentBetRate;
    });
    this.betForm.get('picked_team').valueChanges.subscribe(team => {
      if(team === 0) {
        this.currentBetRate = this.match.team_one_win_exchange;
      } else if(team == 1) {
        this.currentBetRate = this.match.team_two_win_exchange;
      } else {
        this.currentBetRate = this.match.tie_exchange;
      }
      this.winValue = this.betForm.get('price').value * this.currentBetRate;
    });
  }
}
