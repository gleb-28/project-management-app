import { tasksAdapter } from '../../reducers/active-board-reducer/tasks-reducer/tasks.reducer';
import { createSelector } from '@ngrx/store';
import { selectActiveBoardFeature } from './active-board.selector';
import { ColumnId } from '../../../models/ids.model';

const { selectAll } = tasksAdapter.getSelectors();

export const selectTasksState = createSelector(selectActiveBoardFeature, (state) => state.tasks);

export const selectAllTasks = createSelector(selectTasksState, selectAll);

export const selectTasksByColumnId = (columnId: ColumnId) =>
	createSelector(selectAllTasks, (tasks) => tasks.filter((task) => task.columnId === columnId));
