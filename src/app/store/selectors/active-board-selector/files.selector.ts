import { TaskId } from '@app/models/ids.model';
import { filesAdapter } from '@app/store/reducers/active-board-reducer/files-reducer/files.reducer';
import { createSelector } from '@ngrx/store';
import { selectActiveBoardFeature } from './active-board.selector';


const { selectAll } = filesAdapter.getSelectors();

export const selectFilesState = createSelector(selectActiveBoardFeature, (state) => state.files);

export const selectAllFiles = createSelector(selectFilesState, selectAll);

export const selectFilesByTaskId = (taskId: TaskId) =>
	createSelector(selectAllFiles, (files) => files.filter((file) => file.taskId === taskId));
