import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ErrorDataService {

	private dataSource: BehaviorSubject<string> = new BehaviorSubject<string>('');
	public data: Observable<string> = this.dataSource.asObservable();

	public sendData(data: string):void {
		this.dataSource.next(data);
	}

}
