import { createAction, props } from '@ngrx/store';
import { SignInRequest, SignUpRequest, SignUpResponse } from 'src/app/models/auth.model';
import { ErrorResponse } from 'src/app/models/error.model';
import { UserRequest, UserResponse } from 'src/app/models/user.model';


export const enum UserAction {
	getUser = '[App] Get User',
	getUserDAta = '[App] Get User Data',

	signUpSuccess = '[Registration] Sign Up Success',
	signUpFailure = '[Registration] Sign Up Failure',
	signUpPending = '[Registration] Sign Up Pending',

	loginPending = '[Login Page] Login Pending',
	loginSuccess = '[Login Page] Login Success',
	loginFailure = '[Login Page] Login Failure',

	editUserPending = '[User Settings Page] Edit User Pending',
	editUserSuccess = '[User Settings Page] Edit User Success',
	editUserFailure = '[User Settings Page] Edit User Failure',

	deleteUserPending = '[Header] Delete User Pending',
	deleteUserSuccess = '[Header] Delete User Success',
}

export const getUser = createAction(
	UserAction.getUser,
	props<{ response: SignUpResponse }>());

export const getUserData = createAction(
	UserAction.getUserDAta);



export const signUpSuccess = createAction(
	UserAction.signUpSuccess,
	props<{ response: SignUpResponse }>(),
);
export const signUpPending = createAction(
	UserAction.signUpPending,
	props<{ request: SignUpRequest }>(),
);
export const signUpFailure = createAction(
	UserAction.signUpFailure,
	props<{ error: ErrorResponse }>());



export const loginPending = createAction(
	UserAction.loginPending,
	props<{ request: SignInRequest }>(),
);
export const loginSuccess = createAction(UserAction.loginSuccess);
export const loginFailure = createAction(
	UserAction.loginFailure,
	props<{ error: ErrorResponse }>());


export const editUserPending = createAction(
	UserAction.editUserPending,
	props<{ request: UserRequest }>(),
);
export const editUserSuccess = createAction(
	UserAction.editUserSuccess,
	props<{ response: UserResponse }>(),
);
export const editUserFailure = createAction(
	UserAction.editUserFailure,
	props<{ error: ErrorResponse }>());

export const deleteUserPending = createAction(UserAction.deleteUserPending);

export const deleteUserSuccess = createAction(UserAction.deleteUserSuccess);

