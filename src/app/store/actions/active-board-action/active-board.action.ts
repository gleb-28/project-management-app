import { createAction, props } from '@ngrx/store';
import { ErrorResponse } from '../../../models/error.model';
import { BoardResponse } from '../../../models/board.model';
import { ColumnRequest, ColumnResponse } from '../../../models/column.model';
import { TaskRequest, TaskResponse } from '../../../models/task.model';
import { FileResponse } from '../../../models/file.model';
import { BoardId, ColumnId, FileId, TaskId } from '../../../models/ids.model';

// Board
export const openBoard = createAction('[Board] Open board', props<{ boardId: BoardId }>());

export const loadBoard = createAction('[Board] Load board', props<{ boardId: BoardId }>());
export const loadBoardSuccess = createAction('[Board] Load board success', props<{ board: BoardResponse }>());
export const loadBoardError = createAction('[Board] Load board error', props<{ error: ErrorResponse }>());

// Columns
export const loadColumns = createAction('[Board] Load columns', props<{ boardId: BoardId }>());
export const loadColumnsSuccess = createAction('[Board] Load columns success', props<{ columns: ColumnResponse[] }>());
export const loadColumnsError = createAction('[Board] Load columns error', props<{ error: ErrorResponse }>());

export const createColumn = createAction('[Board] Create column', props<{ boardId: BoardId; columnData: ColumnRequest }>());
export const createColumnSuccess = createAction('[Board] Create column success', props<{ column: ColumnResponse }>());
export const createColumnError = createAction('[Board] Create column error', props<{ error: ErrorResponse }>());

export const updateColumn = createAction('[Board] Update column', props<{ boardId: BoardId; columnId: ColumnId; columnData: ColumnRequest }>());
export const updateColumnSuccess = createAction('[Board] Update column success', props<{ column: ColumnResponse }>());
export const updateColumnError = createAction('[Board] Update column error', props<{ error: ErrorResponse }>());

export const deleteColumn = createAction('[Board] Delete column', props<{ boardId: BoardId; columnId: ColumnId }>());
export const deleteColumnSuccess = createAction('[Board] Delete column success', props<{ columnId: ColumnId }>());
export const deleteColumnError = createAction('[Board] Delete column error', props<{ error: ErrorResponse }>());

// Tasks
export const loadTasks = createAction('[Board] Load tasks', props<{ boardId: BoardId }>());
export const loadTasksSuccess = createAction('[Board] Load tasks success', props<{ tasks: TaskResponse[] }>());
export const loadTasksError = createAction('[Board] Load tasks error', props<{ error: ErrorResponse }>());

export const createTask = createAction('[Board] Create task', props<{ boardId: BoardId; columnId: ColumnId; taskData: TaskRequest }>());
export const createTaskSuccess = createAction('[Board] Create task success', props<{ task: TaskResponse }>());
export const createTaskError = createAction('[Board] Create task error', props<{ error: ErrorResponse }>());

export const updateTask = createAction('[Board] Update task',	props<{ boardId: BoardId; columnId: ColumnId; taskId: TaskId; taskData: TaskRequest }>());
export const updateTaskSuccess = createAction('[Board] Update task success',	props<{ task: TaskResponse }>());
export const updateTaskError = createAction('[Board] Update task error', props<{ error: ErrorResponse }>());

export const deleteTask = createAction('[Board] Delete task',	props<{ boardId: BoardId; columnId: ColumnId; taskId: TaskId }>());
export const deleteTaskSuccess = createAction('[Board] Delete task success', props<{ taskId: TaskId }>());
export const deleteTaskError = createAction('[Board] Delete task error', props<{ error: ErrorResponse }>());

// Files
export const loadFiles = createAction('[Board] Load files', props<{ boardId: BoardId }>());
export const loadFilesSuccess = createAction('[Board] Load files success', props<{ files: FileResponse[] }>());
export const loadFilesError = createAction('[Board] Load files error', props<{ error: ErrorResponse }>());

export const uploadFile = createAction('[Board] Upload file', props<{ formData: FormData }>());
export const uploadFileSuccess = createAction('[Board] Upload file success', props<{ files: FileResponse[] }>());
export const uploadFileError = createAction('[Board] Upload file error', props<{ error: ErrorResponse }>());

export const deleteFile = createAction('[Board] Delete file', props<{ fileId: FileId }>());
export const deleteFileSuccess = createAction('[Board] Delete file success', props<{ fileId: FileId }>());
export const deleteFileError = createAction('[Board] Delete file error', props<{ error: ErrorResponse }>());
