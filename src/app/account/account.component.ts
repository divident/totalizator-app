import { Component, OnInit, NgZone } from '@angular/core';
import { Account } from '../shared/account';
import { Transaction } from '../shared/transaction';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  private account: Account;
  private transactions: Transaction[];
  private displayedColumns: string[] = ['created_date', 'title', 'amount'];
  constructor(private accountService: AccountService,
              private zone : NgZone) { }

  ngOnInit() {
    this.getAccount();
    this.getTransactions();
  }

  getAccount(): void {
    this.accountService.getAccount()
      .subscribe(account => this.account = account)
  }

  getTransactions(): void {
    this.accountService.getTransations()
      .subscribe(transactions => {
        this.transactions = transactions;
        console.log(transactions[0])})
  }

  chargeAccount(amount: number) : void {
    this.accountService.performCharge(amount)
      .subscribe(res =>
        this.zone.runOutsideAngular(() => {
          window.location.href = res.redirectUri;
        })
      ),
      err => {
        console.log(err)
      }
  }
}
