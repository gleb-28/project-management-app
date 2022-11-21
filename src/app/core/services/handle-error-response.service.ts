import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class HandleErrorResponseService {

	public error: BehaviorSubject<string> = new BehaviorSubject<string>('');

	public sendData(errorMessage: string):void {
		this.error.next(errorMessage);
	}

}
