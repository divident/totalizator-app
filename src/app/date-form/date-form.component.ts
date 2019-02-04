import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-form',
  templateUrl: './date-form.component.html',
  styleUrls: ['./date-form.component.css']
})
export class DateFormComponent implements OnInit {
  datesValid = true;
  dateInterval = {dateMin: "", dateMax: ""}
  constructor() { }

  ngOnInit() {
  }

  areDatesValid(): void {
    if(this.dateInterval.dateMax && this.dateInterval.dateMin) {
      this.datesValid = this.dateInterval.dateMin <= this.dateInterval.dateMax ? true : false;
    }
  }

}
