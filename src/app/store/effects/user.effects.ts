import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {  map, switchMap } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { loginPending, signUpPending, signUpSuccess } from '../actions/user.actions';


@Injectable()
export default class UserEffects {

	constructor(
		private actions$: Actions,
		private authService: AuthService,
		private localStorage: LocalStorageService,
	) {}


	signUpPending$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(signUpPending),
			switchMap(({ request }) => this.authService.signUp(request).pipe(map((response) => signUpSuccess({ response })),
				//catchError(() => signUpFailure )
			)),
		);
	});

	signUpSuccess$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(signUpSuccess),
			//TODO: return action signInPending or this.router.navigateByUrl('/auth/sign-in')
		);
	},
	{ dispatch: false },
	);

	loginPending$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(loginPending),
			switchMap(({ request }) => this.authService.login(request).pipe(map((response) =>  this.localStorage.set('token', response)),
				//catchError(() => loginFailure )
			)),
		);
	},
	{ dispatch: false },
	);

}
