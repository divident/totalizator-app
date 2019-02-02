import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.css']
})
export class ErrorsComponent implements OnInit {

  pageMissing: boolean = false;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      const error = data['error'] || 400;
      console.log("Params" + JSON.stringify(data))
      if(error == 404) {
        this.pageMissing = true;
      } else {
        this.pageMissing = false;
      }
    });
  }
}
