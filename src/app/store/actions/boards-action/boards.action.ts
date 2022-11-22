import { createAction, props } from '@ngrx/store';
import { BoardsActionType } from './boards-action.type';
import { BoardId, UserId } from '../../../models/ids.model';
import { BoardRequest, BoardResponse } from '../../../models/board.model';
import { ErrorResponse } from '../../../models/error.model';

export const getUserBoards = createAction(BoardsActionType.GET_USER_BOARDS, props<{ userId: UserId }>());
export const getUserBoardsSuccess = createAction(BoardsActionType.GET_USER_BOARDS_SUCCESS, props<{ boards: BoardResponse[] }>());
export const getUserBoardsError = createAction(BoardsActionType.GET_USER_BOARDS_ERROR, props<{ error: ErrorResponse }>());

export const createBoard = createAction(BoardsActionType.CREATE_BOARD, props<{ boardData: BoardRequest }>());
export const createBoardSuccess = createAction(BoardsActionType.CREATE_BOARD_SUCCESS, props<{ board: BoardResponse }>());
export const createBoardError = createAction(BoardsActionType.CREATE_BOARD_ERROR, props<{ error: ErrorResponse }>());

export const updateBoard = createAction(BoardsActionType.UPDATE_BOARD, props<{ boardId: BoardId; boardData: BoardRequest }>());
export const updateBoardSuccess = createAction(BoardsActionType.UPDATE_BOARD_SUCCESS, props<{ board: BoardResponse }>());
export const updateBoardError = createAction(BoardsActionType.UPDATE_BOARD_ERROR, props<{ error: ErrorResponse }>());

export const deleteBoard = createAction(BoardsActionType.DELETE_BOARD, props<{ boardId: BoardId }>());
export const deleteBoardSuccess = createAction(BoardsActionType.DELETE_BOARD_SUCCESS, props<{ boardId: BoardId }>());
export const deleteBoardError = createAction(BoardsActionType.DELETE_BOARD_ERROR, props<{ error: ErrorResponse }>());

export const addMember = createAction(BoardsActionType.ADD_MEMBER, props<{ login: string, boardId: BoardId; boardData: BoardRequest }>());
export const addMemberSuccess = createAction(BoardsActionType.ADD_MEMBER_SUCCESS);
export const addMemberError = createAction(BoardsActionType.ADD_MEMBER_ERROR, props<{ error: ErrorResponse }>());
