import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, concatMap, exhaustMap, map, of, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import * as userAction from '@app/store/actions/user-action/user.action';
import { ErrorResponse } from '@app/models/error.model';
import { AuthService } from '@app/auth/service/auth.service';
import { UserService } from '@app/auth/service/user.service';
import { LocalStorageService } from '@app/core/services/local-storage.service';
import { SignInRequest } from '@app/models/auth.model';
import { selectUserId } from '@app/store/selectors/user-selector/user.selector';

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
						if (this.router.url === '/sign-in' || this.router.url === '/sign-up') this.router.navigateByUrl('boards');
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
				const signInUserData: SignInRequest = {
					login: request.login,
					password: request.password,
				};
				return this.authService.signUp(request).pipe(
					switchMap(() => {
						return [userAction.signUpSuccess(), userAction.login({ request: signInUserData })];
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
