import { Injectable } from '@angular/core';
import { TasksService } from '@app/boards/services/tasks/tasks.service';
import { ErrorResponse } from '@app/models/error.model';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import * as fromBoard from '@app/store/actions/active-board-action/active-board.action';

@Injectable()
export class TasksEffect {
	constructor(private actions$: Actions, private tasksService: TasksService) {}

	public loadTasks$ = createEffect(() => {
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

	public createTask$ = createEffect(() => {
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

	public updateTask$ = createEffect(() => {
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

	public deleteTask$ = createEffect(() => {
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
