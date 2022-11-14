import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ColumnsService } from '../../../../boards/services/columns/columns.service';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { ErrorResponse } from '../../../../models/error.model';
import * as fromBoard from '../../../actions/active-board-action/active-board.action';

@Injectable()
export class ColumnsEffect {
	constructor(private actions$: Actions, private columnsService: ColumnsService) {}

	loadColumns$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(fromBoard.loadColumns),
			switchMap(({ boardId }) => {
				return this.columnsService.getColumnsInBoard(boardId).pipe(
					map((columns) => fromBoard.loadColumnsSuccess({ columns })),

					catchError((error: ErrorResponse) => of(fromBoard.loadColumnsError({ error }))),
				);
			}),
		);
	});

	createColumn$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(fromBoard.createColumn),
			mergeMap(({ boardId, columnData }) => {
				return this.columnsService.createColumnInBoard(boardId, columnData).pipe(
					map((column) => fromBoard.createColumnSuccess({ column })),

					catchError((error: ErrorResponse) => of(fromBoard.createColumnError({ error }))),
				);
			}),
		);
	});

	updateColumn$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(fromBoard.updateColumn),
			mergeMap(({ boardId, columnId, columnData }) => {
				return this.columnsService.updateColumnById(boardId, columnId, columnData).pipe(
					map((column) => fromBoard.updateColumnSuccess({ column })),

					catchError((error: ErrorResponse) => of(fromBoard.updateColumnError({ error }))),
				);
			}),
		);
	});

	deleteColumn$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(fromBoard.deleteColumn),
			mergeMap(({ boardId, columnId }) => {
				return this.columnsService.deleteColumnById(boardId, columnId).pipe(
					map(() => fromBoard.deleteColumnSuccess({ columnId })),

					catchError((error: ErrorResponse) => of(fromBoard.deleteColumnError({ error }))),
				);
			}),
		);
	});
}