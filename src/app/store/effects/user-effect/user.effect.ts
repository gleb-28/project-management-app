import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, concatMap, exhaustMap, map, of, switchMap } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { UserService } from 'src/app/auth/service/user.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { selectUserId } from '../../selectors/user-selector/user.selector';
import { ErrorResponse } from 'src/app/models/error.model';
import { Router } from '@angular/router';
import * as userAction from '../../actions/user-action/user.action';

@Injectable()
export default class UserEffect {
	constructor(
		private actions$: Actions,
		private authService: AuthService,
		private localStorage: LocalStorageService,
		private userService: UserService,
		private store: Store,
		private router: Router,
	) {}

	getUser$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(ROOT_EFFECTS_INIT, userAction.getUser),
			exhaustMap(() => {
				const userId = this.authService.getIdFromToken();
				return this.userService.getUser(userId).pipe(
					map((response) => {
						this.router.navigateByUrl('');
						return userAction.getUserSuccess({ response });
					}),

					catchError((error: ErrorResponse) => of(userAction.getUserError({ error }))),
				);
			}),
		);
	});

	login$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(userAction.login),
			exhaustMap(({ request }) => {
				return this.authService.login(request).pipe(
					map((response) => {
						this.localStorage.set('token', response.token);
					}),
					switchMap(() => [userAction.loginSuccess(), userAction.getUser()]),

					catchError((error: ErrorResponse) => of(userAction.loginError({ error }))),
				);
			}),
		);
	});

	signUp$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(userAction.signUp),
			exhaustMap(({ request }) => {
				return this.authService.signUp(request).pipe(
					map(() => {
						this.router.navigateByUrl('auth/sign-in');
						return userAction.signUpSuccess();
					}),

					catchError((error: ErrorResponse) => of(userAction.signUpError({ error }))),
				);
			}),
		);
	});

	updateUser$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(userAction.editUser),
			concatLatestFrom(() => this.store.select(selectUserId)),
			concatMap(([{ request }, id]) => {
				return this.userService.updateUser(id, request).pipe(
					map((response) => userAction.editUserSuccess({ response })),

					catchError((error: ErrorResponse) => of(userAction.editUserError({ error }))),
				);
			}),
		);
	});

	deleteUser$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(userAction.deleteUser),
			concatLatestFrom(() => this.store.select(selectUserId)),
			switchMap(([, id]) => {
				return this.userService.deleteUser(id).pipe(
					map(() => {
						this.localStorage.remove('token');
						this.router.navigateByUrl('');
						return userAction.deleteUserSuccess();
					}),

					catchError((error: ErrorResponse) => of(userAction.deleteUserError({ error }))),
				);
			}),
		);
	});
}
