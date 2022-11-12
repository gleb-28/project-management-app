import { createReducer, on } from '@ngrx/store';
import { defaultUserState, UserState } from '../models/user.state';
import { signUpFailure, signUpPending, signUpSuccess } from '../actions/user.actions';
import { ReqStatus } from '../enums/req-status';

export const initialState: UserState = defaultUserState;

export const userReducer = createReducer(
	initialState,
	on(signUpPending, (state): UserState => ({ ...state, status: ReqStatus.Pending })),
	on(signUpSuccess, (state): UserState => ({ ...state, status: ReqStatus.Success })),
	on(signUpFailure, (state): UserState => ({ ...state, status: ReqStatus.Error })),

);
