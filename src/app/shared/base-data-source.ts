import { DataSource } from "@angular/cdk/table";
import { BehaviorSubject, Observable, of, Subject } from "rxjs";
import { CollectionViewer } from "@angular/cdk/collections";
import { catchError, finalize } from "rxjs/operators";
import { SerachService } from "./service-generic"


export class BaseDataSource<T> implements DataSource<T> {
    private dataSubject = new BehaviorSubject<T[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private dataCount = new Subject<number>();
    public loading$ = this.loadingSubject.asObservable();

    constructor(private serachService: SerachService<T>) {}

    connect(collectionViewer: CollectionViewer): Observable<T[]> {
        return this.dataSubject.asObservable()
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.dataSubject.complete();
        this.loadingSubject.complete();
    }

    getDataLength(): Observable<number> {
        return this.dataCount.asObservable();
    }

    loadData(...params: [string, string][]): void {
        this.loadingSubject.next(true);
        this.serachService.searchData(...params).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        ).subscribe(res => {
            this.dataSubject.next(res[0]);
            this.dataCount.next(res[1]);
            console.log(res);
        })
    }

}