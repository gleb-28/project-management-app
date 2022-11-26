import { Injectable } from '@angular/core';
import { BoardsService } from '@app/boards/services/boards/boards.service';
import { ErrorResponse } from '@app/models/error.model';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import * as fromBoard from '@app/store/actions/active-board-action/active-board.action';

@Injectable()
export class BoardEffect {
	constructor(private actions$: Actions, private boardsService: BoardsService) {}

	public loadBoard$ = createEffect(() =>
		this.actions$.pipe(
			ofType(fromBoard.loadBoard),
			switchMap(({ boardId }) => {
				return this.boardsService.getBoardById(boardId).pipe(
					map((board) => fromBoard.loadBoardSuccess({ board })),

					catchError((error: ErrorResponse) => of(fromBoard.loadBoardError({ error }))),
				);
			}),
		),
	);
}
