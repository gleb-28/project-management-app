import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs';
import * as fromBoard from '@app/store/actions/active-board-action/active-board.action';

@Injectable()
export class ActiveBoardEffect {
	constructor(private actions$: Actions) {}

	public openBoard$ = createEffect(() =>
		this.actions$.pipe(
			ofType(fromBoard.openBoard),
			switchMap(({ boardId }) => [
				fromBoard.loadBoard({ boardId }),
				fromBoard.loadMembers({ boardId }),
				fromBoard.loadColumns({ boardId }),
				fromBoard.loadTasks({ boardId }),
				fromBoard.loadFiles({ boardId }),
			]),
		),
	);
}
