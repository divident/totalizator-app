import { Component, OnInit, Input } from '@angular/core';

import { Comment } from '../shared/comment';
import { Match } from '../shared/match';
import { CommentsService } from '../comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() match: Match;

  private comments: Comment[];

  constructor(private commentsService: CommentsService) { }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    this.getComments()
  }

  getComments(): void {
    if (this.match) {
      this.commentsService.getMatchComments(this.match.id)
        .subscribe(comments => this.comments = comments)
    }
  }

}
