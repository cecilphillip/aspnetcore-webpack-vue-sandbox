import { IStreamResult } from "@aspnet/signalr";
import { Subject, Observable } from "rxjs";

export function adapt<T = any>(stream: IStreamResult<T>): Observable<T> {
    const subject = new Subject<T>();
    stream.subscribe(subject);
    return subject.asObservable();
}
