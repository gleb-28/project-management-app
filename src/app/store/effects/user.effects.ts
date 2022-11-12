import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { UserService } from 'src/app/auth/service/user.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { editUserPending, editUserSuccess, loginPending, signUpPending, signUpSuccess } from '../actions/user.actions';
import { selectUserId } from '../selectors/user.selectors';


@Injectable()
export default class UserEffects {

	constructor(
		private actions$: Actions,
		private authService: AuthService,
		private localStorage: LocalStorageService,
		private userService: UserService,
		private store: Store,
	) {}


	signUpPending$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(signUpPending),
			switchMap(({ request }) => this.authService.signUp(request).pipe(map((response) => signUpSuccess({ response })),
				//TODO:catchError(() => signUpFailure )
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
				//TODO:catchError(() => loginFailure )
			)),
		);
	},
	{ dispatch: false },
	);

	updateUserPending$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(editUserPending),
			concatLatestFrom(() => this.store.select(selectUserId)),
			switchMap(( [{ request }, id]) =>
				this.userService.updateUser(id, request).pipe(map((response) => editUserSuccess({ response })),
					//TODO:catchError(() => editUserFailure )
				)),
		);
	});
}
