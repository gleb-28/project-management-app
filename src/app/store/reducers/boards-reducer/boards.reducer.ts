import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import * as fromBoards from '@app/store/actions/boards-action/boards.action';
import { BoardResponse } from '@app/models/board.model';
import { ReqStatus } from '@app/store/enums/req-status';
import { BoardsState } from '@app/store/models/boards.state';

export const boardsAdapter: EntityAdapter<BoardResponse> = createEntityAdapter<BoardResponse>({
	selectId: (board) => board._id,
	sortComparer: false,
});

export const boardsInitialState: BoardsState = boardsAdapter.getInitialState({
	status: ReqStatus.Pending,
	error: null,
});

export const boardsReducer = createReducer(
	boardsInitialState,

	on(
		fromBoards.deleteBoardMember,
		fromBoards.addBoardMember,
		fromBoards.getUserBoards,
		fromBoards.createBoard,
		fromBoards.updateBoard,
		fromBoards.deleteBoard,
		(state): BoardsState => ({
			...state,
			status: ReqStatus.Loading,
		}),
	),

	on(fromBoards.getUserBoardsSuccess, (state, { boards }): BoardsState => {
		return boardsAdapter.setAll(boards, { ...state, status: ReqStatus.Success, error: null });
	}),

	on(fromBoards.createBoardSuccess, (state, { board }): BoardsState => {
		return boardsAdapter.addOne(board, { ...state, status: ReqStatus.Success, error: null });
	}),

	on(fromBoards.updateBoardSuccess, (state, { board }): BoardsState => {
		return boardsAdapter.setOne(board, { ...state, status: ReqStatus.Success, error: null });
	}),

	on(fromBoards.deleteBoardSuccess, (state, { boardId }): BoardsState => {
		return boardsAdapter.removeOne(boardId, { ...state, status: ReqStatus.Success, error: null });
	}),
	on(
		fromBoards.addBoardMemberSuccess,
		fromBoards.deleteBoardMemberSuccess,
		(state): BoardsState => ({ ...state, status: ReqStatus.Success, error: null }),
	),

	on(
		fromBoards.deleteBoardMemberError,
		fromBoards.addBoardMemberError,
		fromBoards.getUserBoardsError,
		fromBoards.createBoardError,
		fromBoards.updateBoardError,
		fromBoards.deleteBoardError,
		(state, { error }): BoardsState => ({
			...state,
			status: ReqStatus.Error,
			error,
		}),
	),
);
