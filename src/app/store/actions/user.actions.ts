import { createAction, props } from '@ngrx/store';
import { SignInRequest, SignUpRequest, SignUpResponse } from 'src/app/models/auth.model';
import { ErrorResponse } from 'src/app/models/error.model';
import { UserRequest, UserResponse } from 'src/app/models/user.model';


export const enum UserActionType {
	GET_USER = '[User] Get User',
	GET_USER_DATA = '[User] Get User Data',

	SIGN_UP_SUCCESS = '[User] Sign Up Success',
	SIGN_UP_ERROR = '[User] Sign Up Error',
	SIGN_UP = '[User] Sign Up',

	LOGIN = '[User] Login',
	LOGIN_SUCCESS = '[User] Login Success',
	LOGIN_ERROR = '[User] Login Error',

	EDIT_USER = '[User] Edit User',
	EDIT_USER_SUCCESS = '[User] Edit User Success',
	EDIT_USER_ERROR = '[User] Edit User Error',

	DELETE_USER = '[User] Delete User',
	DELETE_USER_SUCCESS = '[User] Delete User Success',
}

export const getUser = createAction(
	UserActionType.GET_USER,
	props<{ response: SignUpResponse }>());

export const getUserData = createAction(
	UserActionType.GET_USER_DATA);



export const signUpSuccess = createAction(
	UserActionType.SIGN_UP_SUCCESS,
	props<{ response: SignUpResponse }>(),
);
export const signUp = createAction(
	UserActionType.SIGN_UP,
	props<{ request: SignUpRequest }>(),
);
export const signUpError = createAction(
	UserActionType.SIGN_UP_ERROR,
	props<{ error: ErrorResponse }>());



export const login = createAction(
	UserActionType.LOGIN,
	props<{ request: SignInRequest }>(),
);
export const loginSuccess = createAction(UserActionType.LOGIN_SUCCESS);
export const loginError = createAction(
	UserActionType.LOGIN_ERROR,
	props<{ error: ErrorResponse }>());


export const editUser = createAction(
	UserActionType.EDIT_USER,
	props<{ request: UserRequest }>(),
);
export const editUserSuccess = createAction(
	UserActionType.EDIT_USER_SUCCESS,
	props<{ response: UserResponse }>(),
);
export const editUserError = createAction(
	UserActionType.EDIT_USER_ERROR,
	props<{ error: ErrorResponse }>());

export const deleteUser = createAction(UserActionType.DELETE_USER);

export const deleteUserSuccess = createAction(UserActionType.DELETE_USER_SUCCESS);

