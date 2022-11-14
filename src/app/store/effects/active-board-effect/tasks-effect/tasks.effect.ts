import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TasksService } from '../../../../boards/services/tasks/tasks.service';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { ErrorResponse } from '../../../../models/error.model';
import * as fromBoard from '../../../actions/active-board-action/active-board.action';

@Injectable()
export class TasksEffect {
	constructor(private actions$: Actions, private tasksService: TasksService) {}

	loadTasks$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(fromBoard.loadTasks),
			switchMap(({ boardId }) => {
				return this.tasksService.getTasksByBoardId(boardId).pipe(
					map((tasks) => fromBoard.loadTasksSuccess({ tasks })),

					catchError((error: ErrorResponse) => of(fromBoard.loadTasksError({ error }))),
				);
			}),
		);
	});

	createTask$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(fromBoard.createTask),
			mergeMap(({ boardId, columnId, taskData }) => {
				return this.tasksService.createTask(boardId, columnId, taskData).pipe(
					map((task) => fromBoard.createTaskSuccess({ task })),

					catchError((error: ErrorResponse) => of(fromBoard.createTaskError({ error }))),
				);
			}),
		);
	});

	updateTask$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(fromBoard.updateTask),
			mergeMap(({ boardId, columnId, taskId, taskData }) => {
				return this.tasksService.updateTaskById(boardId, columnId, taskId, taskData).pipe(
					map((task) => fromBoard.updateTaskSuccess({ task })),

					catchError((error: ErrorResponse) => of(fromBoard.updateTaskError({ error }))),
				);
			}),
		);
	});

	deleteTask$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(fromBoard.deleteTask),
			mergeMap(({ boardId, columnId, taskId }) => {
				return this.tasksService.deleteTaskById(boardId, columnId, taskId).pipe(
					map(() => fromBoard.deleteTaskSuccess({ taskId })),

					catchError((error: ErrorResponse) => of(fromBoard.deleteTaskError({ error }))),
				);
			}),
		);
	});
}
