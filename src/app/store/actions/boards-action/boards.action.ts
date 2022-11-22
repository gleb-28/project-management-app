import { createAction, props } from '@ngrx/store';
import { BoardId, UserId } from '../../../models/ids.model';
import { BoardRequest, BoardResponse } from '../../../models/board.model';
import { ErrorResponse } from '../../../models/error.model';

export const getUserBoards = createAction('[Boards] Get all user boards', props<{ userId: UserId }>());
export const getUserBoardsSuccess = createAction('[Boards] Get all user boards success', props<{ boards: BoardResponse[] }>());
export const getUserBoardsError = createAction('[Boards] Get all user boards error', props<{ error: ErrorResponse }>());

export const createBoard = createAction('[Boards] Create board', props<{ boardData: BoardRequest }>());
export const createBoardSuccess = createAction('[Boards] Create board success', props<{ board: BoardResponse }>());
export const createBoardError = createAction('[Boards] Create board error', props<{ error: ErrorResponse }>());

export const updateBoard = createAction('[Boards] Update board', props<{ boardId: BoardId; boardData: BoardRequest }>());
export const updateBoardSuccess = createAction('[Boards] Update board success', props<{ board: BoardResponse }>());
export const updateBoardError = createAction('[Boards] Update board error', props<{ error: ErrorResponse }>());

export const deleteBoard = createAction('[Boards] Delete board', props<{ boardId: BoardId }>());
export const deleteBoardSuccess = createAction('[Boards] Delete board success', props<{ boardId: BoardId }>());
export const deleteBoardError = createAction('[Boards] Delete board error', props<{ error: ErrorResponse }>());
