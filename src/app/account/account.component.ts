import { Component, OnInit, NgZone, ErrorHandler } from '@angular/core';
import { Account } from '../shared/account';
import { Transaction } from '../shared/transaction';
import { AccountService } from '../services/account.service';
import { BaseDataSource } from '../shared/base-data-source';
import { ErrorsHandler } from '../errors-handler';
import { ChargeDialogComponent } from '../charge-dialog/charge-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css', '../app.component.css'],
  providers: [{ provide: ErrorHandler, useClass: ErrorsHandler }]
})
export class AccountComponent implements OnInit {

  private account: Account;
  private transactionsDataSource: BaseDataSource<Transaction>;
  private displayedColumns: string[] = ['created_date', 'title', 'amount'];
  constructor(private accountService: AccountService,
    private zone: NgZone,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.getAccount();
    this.transactionsDataSource = new BaseDataSource<Transaction>(this.accountService);
    this.transactionsDataSource.loadData();
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
}
