import { Injectable } from '@angular/core';
import { CanLoad, Router, UrlTree } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class LoggedAuthGuard implements CanLoad {
	constructor(private router: Router) {}

	canLoad(): boolean | UrlTree {
		const isLogged = false; //TODO: get stream from store
		return !isLogged ? true : this.router.parseUrl('');
	}
}
