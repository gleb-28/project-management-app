import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { BoardsService } from '@app/boards/services/boards/boards.service';
import { ErrorResponse } from '@app/models/error.model';
import * as fromBoard from '../../../actions/active-board-action/active-board.action';

@Injectable()
export class MembersEffect {
	constructor(private actions$: Actions, private boardsService: BoardsService) {}

	public loadMembers$ = createEffect(() =>
		this.actions$.pipe(
			ofType(fromBoard.loadMembers),
			switchMap(({ boardId }) => {
				return this.boardsService.getBoardMembersByBoardId(boardId).pipe(
					map((members) => fromBoard.loadMembersSuccess({ members })),

					catchError((error: ErrorResponse) => of(fromBoard.loadMembersError({ error }))),
				);
			}),
		),
	);
}
