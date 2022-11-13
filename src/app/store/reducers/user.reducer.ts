import { createReducer, on } from '@ngrx/store';
import { defaultUserState, UserState } from '../models/user.state';
import { ReqStatus } from '../enums/req-status';
import * as userAction from '../actions/user.actions';

export const initialState: UserState = defaultUserState;

export const userReducer = createReducer(
	initialState,
	on(userAction.getUser, (state, { response }): UserState => ({ ...state, user: response })),
	on(userAction.signUpPending,
		userAction.loginPending,
		userAction.editUserPending,
		userAction.deleteUserPending, (state): UserState => ({ ...state, status: ReqStatus.Pending })),
	on(userAction.signUpSuccess, (state, { response }): UserState => ({ ...state, user: response, status: ReqStatus.Success })),
	on(userAction.signUpFailure,
		userAction.loginFailure,
		userAction.editUserFailure, (state): UserState => ({ ...state, status: ReqStatus.Error })),
	on(userAction.loginSuccess, (state): UserState => ({ ...state, status: ReqStatus.Success })),
	on(userAction.editUserSuccess, (state, { response }): UserState => ({ ...state, user: response, status: ReqStatus.Success })),
	on(userAction.deleteUserSuccess, (state): UserState => ({ ...state, user: defaultUserState.user, status: ReqStatus.Success })),
);
