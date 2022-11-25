import { createReducer, on } from '@ngrx/store';
import { UserState } from '../../models/user.state';
import { ReqStatus } from '../../enums/req-status';
import * as userAction from '../../actions/user-action/user.action';

export const defaultUserState: UserState = {
	user: {
		_id: '',
		login: '',
		name: '',
	},
	status: ReqStatus.Pending,
	error: null,
};

export const userReducer = createReducer(
	defaultUserState,
	on(
		userAction.getUser,
		userAction.signUp,
		userAction.login,
		userAction.editUser,
		userAction.deleteUser,
		userAction.logout,
		(state): UserState => ({ ...state, status: ReqStatus.Loading }),
	),

	on(
		userAction.getUserSuccess,
		userAction.editUserSuccess,
		(state, { response }): UserState => ({ ...state, user: response, status: ReqStatus.Success, error: null }),
	),

	on(
		userAction.loginSuccess,
		userAction.signUpSuccess,
		(state): UserState => ({ ...state, status: ReqStatus.Success, error: null }),
	),

	on(
		userAction.logoutSuccess,
		userAction.deleteUserSuccess,
		(state): UserState => ({ ...state, user: defaultUserState.user, status: ReqStatus.Success, error: null }),
	),

	on(
		userAction.getUserError,
		userAction.signUpError,
		userAction.loginError,
		userAction.editUserError,
		userAction.deleteUserError,
		(state, { error }): UserState => ({
			...state,
			status: ReqStatus.Error,
			error,
		}),
	),
);
