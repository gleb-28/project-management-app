import { createReducer, on } from '@ngrx/store';
import { defaultUserState, UserState } from '../models/user.state';
import { ReqStatus } from '../enums/req-status';
import * as userAction from '../actions/user.actions';

export const initialState: UserState = defaultUserState;

export const userReducer = createReducer(
	initialState,
	on(userAction.getUser, (state, { response }): UserState => ({ ...state, user: response })),
	on(userAction.signUp,
		userAction.login,
		userAction.editUser,
		userAction.deleteUser, (state): UserState => ({ ...state, status: ReqStatus.Pending, error: null })),
	on(userAction.signUpSuccess, (state, { response }): UserState => ({ ...state, user: response, status: ReqStatus.Success, error: null })),
	on(userAction.signUpError,
		userAction.loginError,
		userAction.editUserError, (state, { error }): UserState => ({
			...state,
			status: ReqStatus.Error,
			error,
		})),
	on(userAction.loginSuccess, (state): UserState => ({ ...state, status: ReqStatus.Success })),
	on(userAction.editUserSuccess, (state, { response }): UserState => ({ ...state, user: response, status: ReqStatus.Success, error: null })),
	on(userAction.deleteUserSuccess, (state): UserState => ({ ...state, user: defaultUserState.user, status: ReqStatus.Success, error: null })),
);
