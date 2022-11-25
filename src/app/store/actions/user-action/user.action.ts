import { SignUpResponse, SignInRequest, SignUpRequest } from '@app/models/auth.model';
import { ErrorResponse } from '@app/models/error.model';
import { UserRequest, UserResponse } from '@app/models/user.model';
import { createAction, props } from '@ngrx/store';

export const getUser = createAction('[User] Get User');
export const getUserSuccess = createAction('[User] Get User Success', props<{ response: SignUpResponse }>());
export const getUserError = createAction('[User] Get User Error', props<{ error: ErrorResponse }>());

export const login = createAction('[User] Login', props<{ request: SignInRequest }>());
export const loginSuccess = createAction('[User] Login Success');
export const loginError = createAction('[User] Login Error', props<{ error: ErrorResponse }>());

export const signUp = createAction('[User] Sign Up', props<{ request: SignUpRequest }>());
export const signUpSuccess = createAction('[User] Sign Up Success');
export const signUpError = createAction('[User] Sign Up Error', props<{ error: ErrorResponse }>());

export const editUser = createAction('[User] Edit User', props<{ request: UserRequest }>());
export const editUserSuccess = createAction('[User] Edit User Success', props<{ response: UserResponse }>());
export const editUserError = createAction('[User] Edit User Error', props<{ error: ErrorResponse }>());

export const deleteUser = createAction('[User] Delete User');
export const deleteUserSuccess = createAction('[User] Delete User Success');
export const deleteUserError = createAction('[User] Delete User Error', props<{ error: ErrorResponse }>());

export const logout = createAction('[User] Logout User');

