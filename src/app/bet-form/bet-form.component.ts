import { Component, OnInit, Input } from '@angular/core';
import { Bet } from '../shared/bet';
import { Match } from '../shared/match';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BetService } from '../services/bet.service';

@Component({
  selector: 'app-bet-form',
  templateUrl: './bet-form.component.html',
  styleUrls: ['./bet-form.component.css']
})

export class BetFormComponent implements OnInit {
  match: Match;
  betForm: FormGroup;

  model = new Bet();
  teams = undefined;
  currentBetRate: number;
  winValue: number;
  constructor(private formBuilder: FormBuilder,
    private betService: BetService) { }

  ngOnInit() {
  }

  createForm(): void {
    this.teams = [this.match.team_one, this.match.team_two, 'Remis']
    this.betForm = this.formBuilder.group({
      price: 5,
      picked_team: this.teams[0]
    });
    this.currentBetRate = this.match.team_one_win_exchange;
    this.winValue = <number>(this.betForm.get("price").value) * this.currentBetRate;
    this.onChanges();
  }

  onSubmit() {
    this.betForm.value['match'] = this.match.id;
    console.log(this.betForm.validator);
    this.betService.postBet(this.betForm.value)
      .subscribe(bet => {
        if (bet) {
          console.log(JSON.stringify(bet));
        }
      })
  }

  onChanges(): void {
    this.betForm.get('price').valueChanges.subscribe(price => {
      console.log("Price changed " + price)
      this.winValue = price * this.currentBetRate;
    });
    this.betForm.get('picked_team').valueChanges.subscribe(team => {
      if(team === this.match.team_one) {
        this.currentBetRate = this.match.team_one_win_exchange;
      } else if(team == this.match.team_two) {
        this.currentBetRate = this.match.team_two_win_exchange;
      } else {
        this.currentBetRate = this.match.tie_exchange;
      }
      console.log(this.betForm.get('price').value);
      this.winValue = this.betForm.get('price').value * this.currentBetRate;
    });
  }
}
