import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { UserService } from 'src/app/auth/service/user.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { selectUserId } from '../selectors/user.selectors';
import * as userAction from '../actions/user.actions';
import { ErrorResponse } from 'src/app/models/error.model';


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
			ofType(userAction.signUpPending),
			switchMap(({ request }) => {
				return this.authService.signUp(request).pipe(
					map((response) => userAction.signUpSuccess({ response })),
					catchError((error: ErrorResponse) => of(userAction.signUpFailure({ error }))),
				);
			}),
		);
	});

	signUpSuccess$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(userAction.signUpSuccess),
			//TODO: return action signInPending or this.router.navigateByUrl('/auth/sign-in')
		);
	},
	{ dispatch: false },
	);

	loginPending$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(userAction.loginPending),
			switchMap(({ request }) => {
				return this.authService.login(request).pipe(
					map((response) => this.localStorage.set('token', response)),
					catchError((error: ErrorResponse) => of(userAction.loginFailure({ error }))),
				);
			}),
		);
	},
	{ dispatch: false },
	);


	updateUserPending$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(userAction.editUserPending),
			concatLatestFrom(() => this.store.select(selectUserId)),
			switchMap(( [{ request }, id]) => {
				return this.userService.updateUser(id, request).pipe(
					map((response) =>  userAction.editUserSuccess({ response })),
					catchError((error: ErrorResponse) => of(userAction.editUserFailure({ error }))),
				);
			}),
		);
	});


	deleteUserPending$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(userAction.deleteUserPending),
			concatLatestFrom(() => this.store.select(selectUserId)),
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			switchMap(([req, id]) => this.userService.deleteUser(id).pipe(map(() => userAction.deleteUserSuccess()))),
		);
	});

	deleteUserSuccess$ = createEffect(
		() => {
			return this.actions$.pipe(
				ofType(userAction.deleteUserSuccess),
				tap(() => {
					return this.localStorage.clear;
					//TODO: this.router.navigateByUrl('/auth/sign-in');
				}),
			);
		},
		{ dispatch: false },
	);
}
