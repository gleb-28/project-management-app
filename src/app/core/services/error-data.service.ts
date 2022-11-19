import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ErrorDataService {

	private errorSource: BehaviorSubject<string> = new BehaviorSubject<string>('');
	public error: Observable<string> = this.errorSource.asObservable();

	public sendData(error: string):void {
		this.errorSource.next(error);
	}

}
