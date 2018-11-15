import { Component, OnInit } from '@angular/core';
import { BetService } from '../services/bet.service';
import { Bet } from '../shared/bet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bet',
  templateUrl: './bet.component.html',
  styleUrls: ['./bet.component.css']
})
export class BetComponent implements OnInit {

  bets: Bet[];
  displayedColumns: string[] = ['created_date', 'picked_team', 'price', 'reward', 'actions'];

  constructor(private betService: BetService,
    private route: Router) { }

  ngOnInit() {
    this.getBets();
  }

  getBets() {
    this.betService.getBets()
      .subscribe(bets => {
        this.bets = bets;
        console.log(JSON.stringify(this.bets));
      });
  }

  selectRow(row: any) {
    this.route.navigate([`/match/${row.match}`]);
  }

  deleteBet(betId: number) {
    console.log(`Delete bet with id ${betId}`);
    this.betService.deleteBet(betId)
      .subscribe(result => console.log(result));
  }
}
