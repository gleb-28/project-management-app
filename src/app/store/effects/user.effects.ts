import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, map, mergeMap, of, switchMap, tap } from 'rxjs';
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
		private LocalStorage: LocalStorageService,
		private userService: UserService,
		private store: Store,
	) {}

	getUser$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(ROOT_EFFECTS_INIT, userAction.getUserData),
			mergeMap(() => {
				let id = this.authService.getIdFromToken();
				return this.userService.getUser(id).pipe(
					map((response)=> userAction.getUser({ response })),
					catchError(() => of(userAction.deleteUserSuccess()),
					),
				);
			}),
		);
	});

	signUp$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(userAction.signUp),
			exhaustMap(({ request }) => {
				return this.authService.signUp(request).pipe(
					map((response) => userAction.signUpSuccess({ response })),
					catchError((error: ErrorResponse) => of(userAction.signUpError({ error }))),
				);
			}),
		);
	});

	signUpSuccess$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(userAction.signUpSuccess),
			tap(() => {
				//TODO: this.router.navigateByUrl('/auth/sign-in')
			}),
		);
	},
	{ dispatch: false },
	);

	login$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(userAction.login),
			switchMap(({ request }) => {
				return this.authService.login(request).pipe(
					map((response) => {
						this.LocalStorage.set('token', response.token);
						return userAction.loginSuccess();
					}),
					catchError((error: ErrorResponse) => of(userAction.loginError({ error }))),
				);
			}),
		);
	 },
	);

	loginSuccess$ = createEffect(()=>{
		return this.actions$.pipe(
			ofType(userAction.loginSuccess),
			map(() => {
				//TODO: this.router.navigateByUrl('main')
				return userAction.getUserData();
			},
			),
		);
	});


	updateUser$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(userAction.editUser),
			concatLatestFrom(() => this.store.select(selectUserId)),
			switchMap(( [{ request }, id]) => {
				return this.userService.updateUser(id, request).pipe(
					map((response) =>  userAction.editUserSuccess({ response })),
					catchError((error: ErrorResponse) => of(userAction.editUserError({ error }))),
				);
			}),
		);
	});


	deleteUser$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(userAction.deleteUser),
			concatLatestFrom(() => this.store.select(selectUserId)),
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			switchMap(([_, id]) => this.userService.deleteUser(id).pipe(map(() => userAction.deleteUserSuccess()))),
		);
	});

	deleteUserSuccess$ = createEffect(
		() => {
			return this.actions$.pipe(
				ofType(userAction.deleteUserSuccess),
				tap(() => {
					return this.LocalStorage.remove('token');
					//TODO: this.router.navigateByUrl('/welcome');
				}),
			);
		},
		{ dispatch: false },
	);
}
