import { createAction, props } from '@ngrx/store';
import { SignInRequest, SignUpRequest, SignUpResponse } from 'src/app/models/auth.model';
import { UserRequest, UserResponse } from 'src/app/models/user.model';



export const enum UserAction {
	signUpSuccess = '[Registration] Sign Up Success',
	signUpFailure = '[Registration] Sign Up Failure',
	signUpPending = '[Registration] Sign Up Pending',
	// isError = '[Error] Get Error Message',
	// errorClear = '[Error] Clear Error Message',
	loginPending = '[Login Page] Login Pending',
	loginSuccess = '[Login Page] Login Success',
	loginFailure = '[Login Page] Login Failure',
	editUserPending = '[User Settings Page] Edit User Pending',
	editUserSuccess = '[User Settings Page] Edit User Success',
	editUserFailure = '[User Settings Page] Edit User Failure',
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


export const loginPending = createAction(
	UserAction.loginPending,
	props<{ request: SignInRequest }>(),
);
export const loginSuccess = createAction(UserAction.loginSuccess);
export const loginFailure = createAction(UserAction.loginFailure);


export const editUserPending = createAction(
	UserAction.editUserPending,
	props<{ request: UserRequest }>(),
);
export const editUserSuccess = createAction(
	UserAction.editUserSuccess,
	props<{ response: UserResponse }>(),
);
export const editUserFailure = createAction(UserAction.editUserFailure);





// export const isErrorMessage = createAction(
// 	UserAction.isError,
// 	props<{ message: string }>(),
// );

// export const clearErrorMessage = createAction(UserAction.errorClear);

