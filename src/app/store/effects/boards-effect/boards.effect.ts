import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BoardsService } from '../../../boards/services/boards/boards.service';
import { catchError, concatMap, map, of, switchMap } from 'rxjs';
import * as fromBoards from '../../actions/boards-action/boards.action';
import { ErrorResponse } from '../../../models/error.model';
import { UserService } from 'src/app/auth/service/user.service';

@Injectable()
export class BoardsEffect {
	constructor(private actions$: Actions, private boardsService: BoardsService, private userService: UserService) {}

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


	addMember$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(fromBoards.addMember),
			concatMap(({ login, boardId, boardData }) => {
				return this.userService.getUsers(login).pipe(
					map((user) => {
						if (user) {
							console.log('TEST before:', user, boardData.users);
							boardData.users = [...boardData.users, user.login];
							console.log('TEST after:', user, boardData.users);
						}
						return fromBoards.updateBoard({ boardId, boardData });
					}),
					catchError((error: ErrorResponse) => of(fromBoards.addMemberError({ error }))),
				);
			}),
		);
	});
}




