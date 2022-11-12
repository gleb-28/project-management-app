import { createReducer, on } from '@ngrx/store';
import { defaultUserState, UserState } from '../models/user.state';
import { loginFailure, loginPending, loginSuccess, signUpFailure, signUpPending, signUpSuccess } from '../actions/user.actions';
import { ReqStatus } from '../enums/req-status';

export const initialState: UserState = defaultUserState;

export const userReducer = createReducer(
	initialState,
	on(signUpPending, (state): UserState => ({ ...state, status: ReqStatus.Pending })),
	on(signUpSuccess, (state, { response }): UserState => ({ ...state, user: response, status: ReqStatus.Success })),
	on(signUpFailure, (state): UserState => ({ ...state, status: ReqStatus.Error })),
	on(loginPending, (state): UserState => ({ ...state, status: ReqStatus.Pending })),
	on(loginSuccess, (state): UserState => ({ ...state, status:ReqStatus.Success })),
	on(loginFailure, (state): UserState => ({ ...state, status:ReqStatus.Error })),

);
