import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUserState } from '../../../store/selectors/user-selector/user.selector';
import { filter, map, Observable } from 'rxjs';
import { ReqStatus } from '../../../store/enums/req-status';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanLoad, CanActivate {
	userState$ = this.store.select(selectUserState);

	constructor(private router: Router, private store: Store) {}

	canActivate(): Observable<boolean | UrlTree> {
		return this.checkAuth();
	}

	canLoad(): Observable<boolean | UrlTree> {
		return this.checkAuth();
	}

	private checkAuth(): Observable<boolean | UrlTree> {
		return this.userState$.pipe(
			filter((state) => state.status !== ReqStatus.Pending),
			map((state) => !!state.user._id || this.router.parseUrl('welcome')),
		);
	}
}
