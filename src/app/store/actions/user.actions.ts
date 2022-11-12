import { createAction, props } from '@ngrx/store';
import { SignInRequest, SignUpRequest, SignUpResponse } from 'src/app/models/auth.model';



export const enum UserAction {
	signUpSuccess = '[Registration] Sign Up Success',
	signUpFailure = '[Registration] Sign Up Failure',
	signUpPending = '[Registration] Sign Up Pending',
	// isError = '[Error] Get Error Message',
	// errorClear = '[Error] Clear Error Message',
	loginPending = '[Login Page] Login Pending',
	loginSuccess = '[Login Page] Login Success',
	loginFailure = '[Login Page] Login Failure',
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
export const loginSuccess = createAction(UserAction.loginSuccess);
export const loginFailure = createAction(UserAction.loginFailure);

export const loginPending = createAction(
	UserAction.loginPending,
	props<{ request: SignInRequest }>(),
);






// export const isErrorMessage = createAction(
// 	UserAction.isError,
// 	props<{ message: string }>(),
// );

// export const clearErrorMessage = createAction(UserAction.errorClear);

