import { createAction, props } from '@ngrx/store';
import { SignInRequest, SignUpRequest, SignUpResponse } from 'src/app/models/auth.model';
import { ErrorResponse } from 'src/app/models/error.model';
import { UserRequest, UserResponse } from 'src/app/models/user.model';
import { UserActionType } from './user-action-type';

export const getUser = createAction(UserActionType.GET_USER);
export const getUserSuccess = createAction(UserActionType.GET_USER_SUCCESS, props<{ response: SignUpResponse }>());
export const getUserError = createAction(UserActionType.GET_USER_ERROR, props<{ error: ErrorResponse }>());

export const login = createAction(UserActionType.LOGIN, props<{ request: SignInRequest }>());
export const loginSuccess = createAction(UserActionType.LOGIN_SUCCESS);
export const loginError = createAction(UserActionType.LOGIN_ERROR, props<{ error: ErrorResponse }>());

export const signUp = createAction(UserActionType.SIGN_UP, props<{ request: SignUpRequest }>());
export const signUpSuccess = createAction(UserActionType.SIGN_UP_SUCCESS);
export const signUpError = createAction(UserActionType.SIGN_UP_ERROR, props<{ error: ErrorResponse }>());

export const editUser = createAction(UserActionType.EDIT_USER, props<{ request: UserRequest }>());
export const editUserSuccess = createAction(UserActionType.EDIT_USER_SUCCESS, props<{ response: UserResponse }>());
export const editUserError = createAction(UserActionType.EDIT_USER_ERROR, props<{ error: ErrorResponse }>());

export const deleteUser = createAction(UserActionType.DELETE_USER);
export const deleteUserSuccess = createAction(UserActionType.DELETE_USER_SUCCESS);
export const deleteUserError = createAction(UserActionType.DELETE_USER_ERROR, props<{ error: ErrorResponse }>());
