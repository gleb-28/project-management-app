import { Injectable } from '@angular/core';
import { BoardsService } from '@app/boards/services/boards/boards.service';
import { ErrorResponse } from '@app/models/error.model';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of, switchMap } from 'rxjs';
import * as fromBoards from '@app/store/actions/boards-action/boards.action';

@Injectable()
export class BoardsEffect {
	constructor(private actions$: Actions, private boardsService: BoardsService) {}

	getBoards$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(fromBoards.getUserBoards),
			switchMap(({ userId }) => {
				return this.boardsService.getBoardsByUserId(userId).pipe(
					map((boards) => fromBoards.getUserBoardsSuccess({ boards })),

					catchError((error: ErrorResponse) => of(fromBoards.getUserBoardsError({ error }))),
				);
			}),
		);
	});

	createBoard$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(fromBoards.createBoard),
			concatMap(({ boardData }) => {
				return this.boardsService.createBoard(boardData).pipe(
					map((board) => fromBoards.createBoardSuccess({ board })),

					catchError((error: ErrorResponse) => of(fromBoards.createBoardError({ error }))),
				);
			}),
		);
	});

	updateBoard$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(fromBoards.updateBoard),
			concatMap(({ boardId, boardData }) => {
				return this.boardsService.updateBoardById(boardId, boardData).pipe(
					map((board) => fromBoards.updateBoardSuccess({ board })),

					catchError((error: ErrorResponse) => of(fromBoards.updateBoardError({ error }))),
				);
			}),
		);
	});

	deleteBoard$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(fromBoards.deleteBoard),
			concatMap(({ boardId }) => {
				return this.boardsService.deleteBoardById(boardId).pipe(
					map(() => fromBoards.deleteBoardSuccess({ boardId })),

					catchError((error: ErrorResponse) => of(fromBoards.deleteBoardError({ error }))),
				);
			}),
		);
	});
}
