import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Match } from '../shared/match';
import { Comment } from '../shared/comment';
import { CommentsService } from '../services/comments.service';
import { MatchService } from '../services/match.service';

@Component({
  selector: 'app-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.css']
})


export class MatchDetailComponent implements OnInit {
  @ViewChild('cform') commentFormDirective;
  commentForm: FormGroup;
  comment: Comment;
  submitted = null;
  showForm = true;
  
  private comments: Comment[];
  private match: Match;

  formErrors = {
    'author': '',
    'comment': ''
  };

  validationMessages = {
    'comment': {
      'required':      'Comment is required.'
    }
  };

  constructor(private route: ActivatedRoute,
              private matchService: MatchService,
              private location: Location,
              private commentsService: CommentsService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
    this.getMatch();
  }

  onSubmit() {
    this.commentForm.value['match'] = this.match.id;
    console.log(this.commentForm.value);
    this.commentsService.postComment(this.commentForm.value)
      .subscribe((comment) => {
        if (comment) {
          this.comments.push(<Comment>comment);
        }
      });
    console.log(this.comment);
    this.commentForm.reset({
      comment: ''
    });
    this.commentFormDirective.resetForm();
  }


  getMatch(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.matchService.getMatch(id)
        .subscribe(match => this.match = match)
    this.getComments(id)
  }
  
  getComments(matchId: number): void {
    this.commentsService.getMatchComments(matchId)
        .subscribe(comments => this.comments = comments)
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
