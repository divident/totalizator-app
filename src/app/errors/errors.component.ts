import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.css']
})
export class ErrorsComponent implements OnInit {

  errorCode: number;
  errorMsg: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      const error = params['error']
      this.errorCode = error.code ? 404 : error.code
      this.errorMsg = error.status ? "Strona nie istnieje" : error.status
      console.log(error)
    });
  }

}
