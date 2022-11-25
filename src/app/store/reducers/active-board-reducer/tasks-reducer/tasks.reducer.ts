import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import * as fromBoard from '@app/store/actions/active-board-action/active-board.action';
import { TaskResponse } from '@app/models/task.model';
import { ReqStatus } from '@app/store/enums/req-status';
import { TasksState } from '@app/store/models/active-board.state';

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
