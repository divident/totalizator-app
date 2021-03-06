import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseDataSource } from '../shared/base-data-source';
import { Bet, BetStatus, getTeamName } from '../shared/bet';
import { BetService } from '../services/bet.service';
import { MatPaginator } from '@angular/material';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bet-history',
  templateUrl: './bet-history.component.html',
  styleUrls: ['./bet-history.component.css', '../app.component.css']
})
export class BetHistoryComponent implements OnInit {
  @ViewChild('pag') paginator: MatPaginator;
  betsDataSource: BaseDataSource<Bet>;

  displayedColumns: string[] = ['created_date', 'picked_team', 'price', 'reward', 'status', 'score_1', 'score_2'];
  queryData = {
    "page": "1",
    "status": BetStatus.WIN.toString()
  }
  betsCount: number;

  constructor(private betService: BetService,
    private router: Router) { }

  ngOnInit() {
    this.betsDataSource = new BaseDataSource<Bet>(this.betService);
    this.loadBets();
    this.betsDataSource.getDataLength().subscribe(res => this.betsCount = res)
  }

  ngAfterViewInit(): void {
    this.paginator.page.pipe(
      tap(() => this.loadBets())
    ).subscribe();
  }

  selectRow(id: number) {
    this.router.navigate([`/matches/${id}`]);
  }

  getTeamName(index: number) {
    return getTeamName(index);
  }

  loadBets() {
    let query: [string, string][] = [];
    query.push()
    for(let [key, val] of Object.entries(this.queryData)) {
      if(key == "page"){
        query.push([key, (this.paginator.pageIndex + 1).toString()]);
      }else {
        query.push([key, val])
      }
    }
    this.betsDataSource.loadData(...query)
  }
  


}
