import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { TaskResponse } from '../../../../models/task.model';
import { TasksState } from '../../../models/active-board.state';
import { ReqStatus } from '../../../enums/req-status';
import { createReducer, on } from '@ngrx/store';
import * as fromBoard from '../../../actions/active-board-action/active-board.action';

export const tasksAdapter: EntityAdapter<TaskResponse> = createEntityAdapter<TaskResponse>({
	selectId: (task) => task._id,
	sortComparer: (a, b) => a.order - b.order,
});

export const tasksInitialState: TasksState = tasksAdapter.getInitialState({
	status: ReqStatus.Pending,
	error: null,
});

export const tasksReducer = createReducer(
	tasksInitialState,
	on(
		fromBoard.loadTasks,
		fromBoard.createTask,
		fromBoard.updateTask,
		fromBoard.deleteTask,
		(state): TasksState => ({
			...state,
			status: ReqStatus.Loading,
		}),
	),

	on(fromBoard.loadTasksSuccess, (state, { tasks }): TasksState => {
		return tasksAdapter.setAll(tasks, { ...state, status: ReqStatus.Success, error: null });
	}),

	on(fromBoard.createTaskSuccess, (state, { task }): TasksState => {
		return tasksAdapter.addOne(task, { ...state, status: ReqStatus.Success, error: null });
	}),

	on(fromBoard.updateTaskSuccess, (state, { task }): TasksState => {
		return tasksAdapter.setOne(task, { ...state, status: ReqStatus.Success, error: null });
	}),

	on(fromBoard.deleteTaskSuccess, (state, { taskId }): TasksState => {
		return tasksAdapter.removeOne(taskId, { ...state, status: ReqStatus.Success, error: null });
	}),

	on(
		fromBoard.loadTasksError,
		fromBoard.createTaskError,
		fromBoard.updateTaskError,
		fromBoard.deleteTaskError,
		(state, { error }): TasksState => ({
			...state,
			status: ReqStatus.Error,
			error,
		}),
	),
);
