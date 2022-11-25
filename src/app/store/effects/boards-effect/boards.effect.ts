import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BoardsService } from '../../../boards/services/boards/boards.service';
import { catchError, concatMap, map, of, switchMap } from 'rxjs';
import * as fromBoards from '../../actions/boards-action/boards.action';
import { ErrorResponse } from '../../../models/error.model';
import { UserService } from 'src/app/auth/service/user.service';
import { SignUpResponse } from 'src/app/models/auth.model';
import { BoardRequest } from 'src/app/models/board.model';
import { HandleErrorResponseService } from 'src/app/core/services/handle-error-response.service';
import { ERROR_MESSAGE } from 'src/app/constants/constants';

@Injectable()
export class BoardsEffect {
	constructor(
		private actions$: Actions,
		private boardsService: BoardsService,
		private userService: UserService,
		private errorService: HandleErrorResponseService,
	) {}

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
			ofType(fromBoards.addBoardMember),
			concatMap(({ login, boardId, boardData }) => {
				return this.userService.getUsers().pipe(
					map((users) => {
						const user: SignUpResponse | undefined = users.find((userInfo) => userInfo.login === login);

						const newBoardData: BoardRequest = {
							title: boardData.title,
							owner: boardData.owner,
							users: boardData.users,
						};

						if (user && !newBoardData.users.includes(user._id)) {
							newBoardData.users = [...newBoardData.users, user._id];
							return newBoardData;
						} else {
							this.errorService.sendData(ERROR_MESSAGE['LOGIN_DOES_NOT_EXIST']);
						}
						return newBoardData;
					}),
					switchMap((newBoardData) => [
						fromBoards.addBoardMemberSuccess(),
						fromBoards.updateBoard({ boardId, boardData: newBoardData }),
					]),
					catchError((error: ErrorResponse) => of(fromBoards.addBoardMemberError({ error }))),
				);
			}),
		);
	});

	deleteMember$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(fromBoards.deleteBoardMember),
			map(({ members, boardId, boardData }) => {
				const newBoardData: BoardRequest = {
					title: boardData.title,
					owner: boardData.owner,
					users: members,
				};
				return { newBoardData, boardId };
			}),
			switchMap(({ newBoardData, boardId }) => [
				fromBoards.deleteBoardMemberSuccess(),
				fromBoards.updateBoard({ boardId, boardData: newBoardData }),
			]),
			catchError((error: ErrorResponse) => of(fromBoards.deleteBoardMemberError({ error }))),
		);
	});
}
