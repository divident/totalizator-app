import { Observable } from "rxjs";

export interface SerachService<T> {
    searchData(...params: [string, string][]): Observable<[T[], number]>;
}