import { Component, OnInit } from '@angular/core';
import { BaseDataSource } from '../shared/base-data-source';
import { Bet, BetStatus } from '../shared/bet';
import { BetService } from '../services/bet.service';

@Component({
  selector: 'app-bet-history',
  templateUrl: './bet-history.component.html',
  styleUrls: ['./bet-history.component.css', '../app.component.css']
})
export class BetHistoryComponent implements OnInit {

  betsDataSource: BaseDataSource<Bet>;

  displayedColumns: string[] = ['created_date', 'picked_team', 'price', 'reward', 'status', 'score_1', 'score_2'];

  constructor(private betService: BetService) { }

  ngOnInit() {
    this.betsDataSource = new BaseDataSource<Bet>(this.betService);
    this.betsDataSource.loadData(["status", BetStatus.WIN.toString()]);
    

  }


}
