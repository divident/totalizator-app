import { Component, OnInit, ErrorHandler } from '@angular/core';
import { BetService } from '../services/bet.service';
import { Bet } from '../shared/bet';
import { Router } from '@angular/router';
import { BaseDataSource } from '../shared/base-data-source';
import { ErrorsHandler } from '../errors-handler';

@Component({
  selector: 'app-bet',
  templateUrl: './bet.component.html',
  styleUrls: ['./bet.component.css', '../app.component.css'],
  providers: [{ provide: ErrorHandler, useClass: ErrorsHandler }]
})
export class BetComponent implements OnInit {

  betsDataSource: BaseDataSource<Bet>;

  displayedColumns: string[] = ['created_date', 'picked_team', 'price', 'reward', 'status', 'actions'];

  constructor(private betService: BetService,
    private route: Router,
    ) { }

  ngOnInit() {
    this.betsDataSource = new BaseDataSource<Bet>(this.betService);
    this.betsDataSource.loadData();
  }

  selectRow(row: any) {
    this.route.navigate([`/match/${row.match}`]);
  }

  deleteBet(betId: number) {

    console.log(`Delete bet with id ${betId}`);
    if (confirm("Czy jesteś pewny")) {
      this.betService.deleteBet(betId)
        .subscribe(result => {
          this.betsDataSource.loadData();
          console.log(result)
        });
    }
  }
}
