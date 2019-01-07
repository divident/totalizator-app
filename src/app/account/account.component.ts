import { Component, OnInit, NgZone, ErrorHandler, ViewChild } from '@angular/core';
import { Account } from '../shared/account';
import { Transaction } from '../shared/transaction';
import { AccountService } from '../services/account.service';
import { BaseDataSource } from '../shared/base-data-source';
import { ErrorsHandler } from '../errors-handler';
import { ChargeDialogComponent } from '../charge-dialog/charge-dialog.component';
import { MatDialog, MatPaginator } from '@angular/material';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css', '../app.component.css'],
  providers: [{ provide: ErrorHandler, useClass: ErrorsHandler }]
})
export class AccountComponent implements OnInit {
  
  @ViewChild('pag') paginator: MatPaginator;

  queryData = {
    "page": "1",
  }

  private account: Account;
  private transactionCount: number;
  private transactionsDataSource: BaseDataSource<Transaction>;
  private displayedColumns: string[] = ['created_date', 'title', 'amount'];
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
        console.log(amount)
        if (amount) {
          this.accountService.performCharge(amount*100)
            .subscribe(res => {
              console.log("Charge: ", res)
              this.zone.runOutsideAngular(() => {
                window.location.href = res.redirectUri;
              })
            })
        }
      })
  }

  ngAfterViewInit(): void {
    console.log('paginator', this.paginator)
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
      console.log(key, val)
      if(key == "page"){
        query.push([key, (this.paginator.pageIndex + 1).toString()]);
      }else {
        query.push([key, val])
      }
    }
    this.transactionsDataSource.loadData(...query)
  }
}
