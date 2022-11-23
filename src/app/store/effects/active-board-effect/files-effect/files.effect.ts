import { Injectable } from '@angular/core';
import { FilesService } from '@app/boards/services/files/files.service';
import { ErrorResponse } from '@app/models/error.model';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import * as fromBoard from '@app/store/actions/active-board-action/active-board.action';

@Injectable()
export class FilesEffect {
	constructor(private actions$: Actions, private filesService: FilesService) {}

	loadFiles$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(fromBoard.loadFiles),
			switchMap(({ boardId }) => {
				return this.filesService.getFilesByBoardId(boardId).pipe(
					map((files) => fromBoard.loadFilesSuccess({ files })),

					catchError((error: ErrorResponse) => of(fromBoard.loadFilesError({ error }))),
				);
			}),
		);
	});

	uploadFile$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(fromBoard.uploadFile),
			mergeMap(({ formData }) => {
				return this.filesService.uploadFile(formData).pipe(
					map((files) => fromBoard.uploadFileSuccess({ files })),

					catchError((error: ErrorResponse) => of(fromBoard.uploadFileError({ error }))),
				);
			}),
		);
	});

	deleteFile$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(fromBoard.deleteFile),
			mergeMap(({ fileId }) => {
				return this.filesService.deleteFileById(fileId).pipe(
					map(() => fromBoard.deleteFileSuccess({ fileId })),

					catchError((error: ErrorResponse) => of(fromBoard.deleteFileError({ error }))),
				);
			}),
		);
	});
}
