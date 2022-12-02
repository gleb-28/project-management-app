import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, UrlTree } from '@angular/router';
import { ReqStatus } from '@app/store/enums/req-status';
import { selectUserState } from '@app/store/selectors/user-selector/user.selector';
import { Store } from '@ngrx/store';
import { Observable, filter, map } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanLoad, CanActivate {
	public userState$ = this.store.select(selectUserState);

	constructor(private router: Router, private store: Store) {}

	public canActivate(): Observable<boolean | UrlTree> {
		return this.checkAuth();
	}

	public canLoad(): Observable<boolean | UrlTree> {
		return this.checkAuth();
	}

	private checkAuth(): Observable<boolean | UrlTree> {
		return this.userState$.pipe(
			filter((state) => state.status !== ReqStatus.Pending),
			map((state) => !!state.user._id || this.router.parseUrl('welcome')),
		);
	}
}
