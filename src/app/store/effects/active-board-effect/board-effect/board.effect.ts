import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { BoardsService } from '../../../../boards/services/boards/boards.service';
import { ErrorResponse } from '../../../../models/error.model';
import * as fromBoard from '../../../actions/active-board-action/active-board.action';

@Injectable()
export class BoardEffect {
	constructor(private actions$: Actions, private boardsService: BoardsService) {}

	loadBoard$ = createEffect(() =>
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
