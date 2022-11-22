import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class LoaderService {
	public isLoading$ = new BehaviorSubject(false);

	public setLoading(loading: boolean) {
		this.isLoading$.next(loading);
	}
}
