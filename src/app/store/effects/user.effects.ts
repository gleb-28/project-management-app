import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { signUpPending, signUpSuccess } from '../actions/user.actions';


@Injectable()
export default class UserEffects {

	constructor(
		private actions: Actions,
		private authService: AuthService,
	) {}

	signUpPending$$ = createEffect(() => {
		return this.actions.pipe(
			ofType(signUpPending),
			mergeMap(({ request }) => this.authService.signUp(request).pipe(map((response) => signUpSuccess({ response })))),
		);
	});

	signUpSuccess$$ = createEffect(() => {
		return this.actions.pipe(
			ofType(signUpSuccess),
			//TODO: return action signInPending or this.router.navigateByUrl('/auth/sign-in')
		);
	},
	);

}
