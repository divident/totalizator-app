import { DataSource } from "@angular/cdk/table";
import { BehaviorSubject, Observable, of } from "rxjs";
import { CollectionViewer } from "@angular/cdk/collections";
import { catchError, finalize } from "rxjs/operators";
import { SerachService } from "./service-generic"


export class BaseDataSource<T> implements DataSource<T> {
    private dataSubject = new BehaviorSubject<T[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private serachService: SerachService<T>) {}

    connect(collectionViewer: CollectionViewer): Observable<T[]> {
        return this.dataSubject.asObservable()
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.dataSubject.complete();
        this.loadingSubject.complete();
    }

    loadData(...params: [string, string][]): void {
        this.loadingSubject.next(true);
        this.serachService.searchData(...params).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        ).subscribe(res => {
            this.dataSubject.next(res);
            console.log(res);
        })
    }

}