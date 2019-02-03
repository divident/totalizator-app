import { Component, OnInit, Input, ViewChild, ErrorHandler } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Match } from '../shared/match';
import { Comment } from '../shared/comment';
import { CommentsService } from '../services/comments.service';
import { MatchService } from '../services/match.service';
import { BetFormComponent } from '../bet-form/bet-form.component';
import { ProcessHttpMsgService } from '../services/process-httpmsg.service';
import { ErrorsHandler } from '../errors-handler';
import { timeInterval } from 'rxjs/operators';
import { delay } from 'q';


@Component({
  selector: 'app-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.css'],
  providers: [{provide: ErrorHandler, useClass: ErrorsHandler}]
})


export class MatchDetailComponent implements OnInit {
  @ViewChild('cform') commentFormDirective;
  @ViewChild(BetFormComponent) betForm;
  commentForm: FormGroup;
  comment: Comment;
  submitted = null;
  showForm = true;
  available: boolean;

  comments: Comment[] = [];
  match: Match;

  formErrors = {
    'author': '',
    'comment': ''
  };

  validationMessages = {
    'comment': {
      'required': 'Comment is required.'
    }
  };

  constructor(private route: ActivatedRoute,
              private matchService: MatchService,
              private commentsService: CommentsService,
              private formBuilder: FormBuilder,
              private errorMsg: ProcessHttpMsgService) { }

  ngOnInit() {
    this.createForm();
    this.getMatch();
  }

  ngAfterViewInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    
    this.matchService.getMatch(id)
      .subscribe(match => {
        delay(2000);
        this.betForm.match = match;
        this.betForm.createForm();});
  }

  onSubmit() {
    this.commentForm.value['match'] = this.match.id;
    this.commentsService.postComment(this.commentForm.value)
      .subscribe(
        (comment) => {
          if (comment) {
            this.comments.push(comment)
          }},
        error => this.errorMsg.handleError("Zaloguj się aby dodać komentarz"));
    this.commentForm.reset({
      comment: ''
    });
    this.commentFormDirective.resetForm();
  }


  getMatch(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.matchService.getMatch(id)
        .subscribe(match => {
          this.match = match,
          this.available = match.score_team_one == -1 ? true : false;
        })
    this.getComments(id)
  }
  
  getComments(matchId: number): void {
    this.commentsService.getMatchComments(matchId)
        .subscribe(comments => {
          this.comments = comments;
        })
  }

  createForm() {
    this.commentForm = this.formBuilder.group({
      content: ['', Validators.required]
    });
    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
      this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }
}
