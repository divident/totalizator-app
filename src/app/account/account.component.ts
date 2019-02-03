import { Component, OnInit, NgZone, ErrorHandler, ViewChild } from '@angular/core';
import { Account } from '../shared/account';
import { Transaction } from '../shared/transaction';
import { AccountService } from '../services/account.service';
import { BaseDataSource } from '../shared/base-data-source';
import { ErrorsHandler } from '../errors-handler';
import { ChargeDialogComponent } from '../charge-dialog/charge-dialog.component';
import { MatDialog, MatPaginator } from '@angular/material';
import { tap } from 'rxjs/operators';
import { DateFormComponent } from '../date-form/date-form.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css', '../app.component.css'],
  providers: [{ provide: ErrorHandler, useClass: ErrorsHandler }]
})

export class AccountComponent implements OnInit {
  
  @ViewChild('pag') paginator: MatPaginator;
  @ViewChild(DateFormComponent) dateForm: DateFormComponent;

  queryData = {
    "page": "1",
  }

  account: Account;
  transactionCount: number;
  transactionsDataSource: BaseDataSource<Transaction>;
  displayedColumns: string[] = ['created_date', 'title', 'amount'];
  
  constructor(private accountService: AccountService,
    private zone: NgZone,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.getAccount();
    this.transactionsDataSource = new BaseDataSource<Transaction>(this.accountService);
    this.loadTransactions()
    this.transactionsDataSource.getDataLength().subscribe(res => this.transactionCount = res)
  }

  getAccount(): void {
    this.accountService.getAccount()
      .subscribe(account => this.account = account)
  }

  chargeAccount(): void {
    let dialog = this.dialog.open(ChargeDialogComponent);
    dialog.afterClosed().subscribe(
      amount => {
        if (amount) {
          this.accountService.performCharge(amount*100)
            .subscribe(res => {
              this.zone.runOutsideAngular(() => {
                window.location.href = res.redirectUri;
              })
            })
        }
      })
  }

  dateFilter(): void {
    this.queryData["min_date"] = this._parse_date(this.dateForm.dateInterval.dateMin);
    this.queryData["max_date"] = this._parse_date(this.dateForm.dateInterval.dateMax);
    this.loadTransactions();
  }

  _parse_date(date: string) : string {
    if(date) {
      return new Date(Date.parse(date)).toJSON()
    } else {
      return ""
    }
  }

  ngAfterViewInit(): void {
    this.paginator.page.pipe(
      tap(() => this.loadTransactions())
    ).subscribe();
  }
  
  getPriceWithSign(sourceAccount: string, price: number) {
    if(sourceAccount == this.account.number) {
      return -price;
    }
    return price;
  }

  loadTransactions() {
    let query: [string, string][] = [];
    query.push()
    for(let [key, val] of Object.entries(this.queryData)) {
      if(key == "page"){
        query.push([key, (this.paginator.pageIndex + 1).toString()]);
      }else {
        query.push([key, val])
      }
    }
    this.transactionsDataSource.loadData(...query)
  }
}
