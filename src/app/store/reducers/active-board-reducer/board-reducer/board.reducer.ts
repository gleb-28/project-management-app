import { ReqStatus } from '../../../enums/req-status';
import { createReducer, on } from '@ngrx/store';
import { BoardState } from '../../../models/active-board.state';
import * as fromBoard from '../../../actions/active-board-action/active-board.action';

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
