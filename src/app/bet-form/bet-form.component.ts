import { Component, OnInit, Input } from '@angular/core';
import { Bet } from '../shared/bet';
import { Match } from '../shared/match';
import { FormGroup, FormBuilder } from '@angular/forms';

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
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  createForm(): void {
    this.teams = [this.match.team_one, this.match.team_two, 'Remis']
    this.betForm = this.formBuilder.group({
      price: 5,
      team: this.teams[0]
    });
    this.currentBetRate = this.match.team_one_win_exchange;
    this.winValue = <number>(this.betForm.get("price").value) * this.currentBetRate;
    this.onChanges();
  }

  onChanges(): void {
    this.betForm.get('price').valueChanges.subscribe(price => {
      console.log("Price changed " + price)
      this.winValue = price * this.currentBetRate;
    });
    this.betForm.get('team').valueChanges.subscribe(team => {
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

  
  get diagnostic() { return JSON.stringify(this.model); }
}
