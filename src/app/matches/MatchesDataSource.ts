import { DataSource } from "@angular/cdk/table";
import { Match } from "../shared/match";
import { BehaviorSubject, Observable, of } from "rxjs";
import { MatchService } from "../services/match.service";
import { CollectionViewer } from "@angular/cdk/collections";
import { finalize, catchError, map } from "rxjs/operators";

export class MatchesDataSource implements DataSource<Match> {
    private matchesSubject = new BehaviorSubject<Match[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private matchService: MatchService) { }

    connect(collectionViewer: CollectionViewer): Observable<Match[]> {
        return this.matchesSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.matchesSubject.complete();
        this.loadingSubject.complete();
    }

    loadMatches(team = '', league = '', pageNumber = 0) {
        this.loadingSubject.next(true)
        this.matchService.serachMatches(team, league, pageNumber).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false)),
        ).subscribe(matches => {
            this.matchesSubject.next(matches),
            console.log(matches)
            })
    }

}