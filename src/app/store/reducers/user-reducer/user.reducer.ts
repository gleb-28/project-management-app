import { createReducer, on } from '@ngrx/store';
import * as userAction from '@app/store/actions/user-action/user.action';
import { ReqStatus } from '@app/store/enums/req-status';
import { UserState } from '@app/store/models/user.state';

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
		userAction.logout,
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
