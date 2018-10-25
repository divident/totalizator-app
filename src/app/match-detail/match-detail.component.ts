import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

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
  @Input() match: Match;

  private comments: Comment[];

  constructor(private route: ActivatedRoute,
              private matchService: MatchService,
              private location: Location,
              private commentsService: CommentsService) { }

  ngOnInit() {
    this.getMatch()
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
}
