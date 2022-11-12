import { createAction, props } from '@ngrx/store';
import { SignUpRequest, SignUpResponse } from 'src/app/models/auth.model';




const enum UserAction {
	signUpSuccess = '[Registration] Sign Up Success',
	signUpFailure = '[Registration] Sign Up Failure',
	signUpPending = '[Registration] Sign Up Pending',
	isError = '[Error] Get Error Message',
	errorClear = '[Error] Clear Error Message',
}

export const signUpSuccess = createAction(
	UserAction.signUpSuccess,
	props<{ response: SignUpResponse }>(),
);

export const signUpPending = createAction(
	UserAction.signUpPending,
	props<{ request: SignUpRequest }>(),
);

export const signUpFailure = createAction(UserAction.signUpFailure);

export const isErrorMessage = createAction(
	UserAction.isError,
	props<{ message: string }>(),
);

export const clearErrorMessage = createAction(UserAction.errorClear);

