import { createAction, props } from '@ngrx/store';
import { BoardResponse, BoardRequest } from '@app/models/board.model';
import { ErrorResponse } from '@app/models/error.model';
import { UserId, BoardId } from '@app/models/ids.model';

export const getUserBoards = createAction('[Boards] Get all user boards', props<{ userId: UserId }>());
export const getUserBoardsSuccess = createAction('[Boards] Get all user boards success', props<{ boards: BoardResponse[] }>());
export const getUserBoardsError = createAction('[Boards] Get all user boards error-toast', props<{ error: ErrorResponse }>());

export const createBoard = createAction('[Boards] Create board', props<{ boardData: BoardRequest }>());
export const createBoardSuccess = createAction('[Boards] Create board success', props<{ board: BoardResponse }>());
export const createBoardError = createAction('[Boards] Create board error-toast', props<{ error: ErrorResponse }>());

export const updateBoard = createAction('[Boards] Update board', props<{ boardId: BoardId; boardData: BoardRequest }>());
export const updateBoardSuccess = createAction('[Boards] Update board success', props<{ board: BoardResponse }>());
export const updateBoardError = createAction('[Boards] Update board error-toast', props<{ error: ErrorResponse }>());

export const deleteBoard = createAction('[Boards] Delete board', props<{ boardId: BoardId }>());
export const deleteBoardSuccess = createAction('[Boards] Delete board success', props<{ boardId: BoardId }>());
export const deleteBoardError = createAction('[Boards] Delete board error-toast', props<{ error: ErrorResponse }>());

export const addBoardMember = createAction('[Boards] Add board member', props<{ login: string, boardId: BoardId; boardData: BoardRequest }>());
export const addBoardMemberSuccess = createAction('[Boards] Add board member success');
export const addBoardMemberError = createAction('[Boards] Add board member error', props<{ error: ErrorResponse }>());

export const deleteBoardMember = createAction('[Boards] Delete board member', props<{ members: string[], boardId: BoardId; boardData: BoardRequest }>());
export const deleteBoardMemberSuccess = createAction('[Boards] Delete board member success');
export const deleteBoardMemberError = createAction('[Boards] Delete board member error', props<{ error: ErrorResponse }>());


