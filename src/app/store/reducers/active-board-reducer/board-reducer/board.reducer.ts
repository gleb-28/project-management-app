import { ReqStatus } from '@app/store/enums/req-status';
import { BoardState } from '@app/store/models/active-board.state';
import { createReducer, on } from '@ngrx/store';
import * as fromBoard from '@app/store/actions/active-board-action/active-board.action';

export const boardInitialState: BoardState = {
	board: null,
	status: ReqStatus.Pending,
	error: null,
};

export const boardReducer = createReducer(
	boardInitialState,
	on(
		fromBoard.loadBoard,
		(state): BoardState => ({
			...state,
			status: ReqStatus.Loading,
		}),
	),

	on(
		fromBoard.loadBoardSuccess,
		(state, { board }): BoardState => ({
			...state,
			board,
			status: ReqStatus.Success,
			error: null,
		}),
	),

	on(
		fromBoard.loadBoardError,
		(state, { error }): BoardState => ({
			...state,
			status: ReqStatus.Error,
			error,
		}),
	),
);
