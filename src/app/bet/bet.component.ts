import { Component, OnInit, ErrorHandler, ViewChild } from '@angular/core';
import { BetService } from '../services/bet.service';
import { Bet } from '../shared/bet';
import { Router } from '@angular/router';
import { BaseDataSource } from '../shared/base-data-source';
import { ErrorsHandler } from '../errors-handler';
import { MatPaginator } from '@angular/material';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-bet',
  templateUrl: './bet.component.html',
  styleUrls: ['./bet.component.css', '../app.component.css'],
  providers: [{ provide: ErrorHandler, useClass: ErrorsHandler }]
})
export class BetComponent implements OnInit {
  @ViewChild('pag') paginator: MatPaginator;
  betsDataSource: BaseDataSource<Bet>;

  displayedColumns: string[] = ['created_date', 'picked_team', 'price', 'reward', 'status', 'match', 'actions'];
  queryData = {
    "page": "1",
  }
  constructor(private betService: BetService,
    private route: Router,
    ) { }

  ngOnInit() {
    this.betsDataSource = new BaseDataSource<Bet>(this.betService);
    this.loadBets();
  }

  ngAfterViewInit(): void {
    this.paginator.page.pipe(
      tap(() => this.loadBets())
    ).subscribe();
  }
  
  selectRow(id: number) {
    this.route.navigate([`/matches/${id}`]);
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

  loadBets() {
    let query: [string, string][] = [];
    query.push()
    for(let [key, val] of Object.entries(this.queryData)) {
      console.log(key, val)
      if(key == "page"){
        query.push([key, (this.paginator.pageIndex + 1).toString()]);
      }else {
        query.push([key, val])
      }
    }
    this.betsDataSource.loadData(...query)
  }
  
}
