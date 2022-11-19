import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsLogged } from '../../../store/selectors/user-selector/user.selector';
import { map, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanLoad, CanActivate {
	isLogged$ = this.store.select(selectIsLogged);

	constructor(private router: Router, private store: Store) {}

	canActivate(): Observable<boolean | UrlTree> {
		return this.checkAuth();
	}

	canLoad(): Observable<boolean | UrlTree> {
		return this.checkAuth();
	}

	private checkAuth(): Observable<boolean | UrlTree> {
		return this.isLogged$.pipe(map((isLogged) => (isLogged ? true : this.router.parseUrl('welcome'))));
	}
}
