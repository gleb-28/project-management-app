import { ReqStatus } from '../../../enums/req-status';
import { createReducer, on } from '@ngrx/store';
import { MembersState } from '../../../models/active-board.state';
import * as fromBoard from '../../../actions/active-board-action/active-board.action';

export const membersInitialState: MembersState = {
	members: [],
	status: ReqStatus.Pending,
	error: null,
};

export const membersReducer = createReducer(
	membersInitialState,
	on(
		fromBoard.loadMembers,
		(state): MembersState => ({
			...state,
			status: ReqStatus.Loading,
		}),
	),

	on(
		fromBoard.loadMembersSuccess,
		(state, { members }): MembersState => ({
			...state,
			members,
			status: ReqStatus.Success,
			error: null,
		}),
	),

	on(
		fromBoard.loadMembersError,
		(state, { error }): MembersState => ({
			...state,
			status: ReqStatus.Error,
			error,
		}),
	),
);
