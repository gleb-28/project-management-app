import { createAction, props } from '@ngrx/store';
import { ActiveBoardActionType } from './active-board-action.type';
import { ErrorResponse } from '../../../models/error.model';
import { BoardResponse } from '../../../models/board.model';
import { ColumnRequest, ColumnResponse } from '../../../models/column.model';
import { TaskRequest, TaskResponse } from '../../../models/task.model';
import { FileResponse } from '../../../models/file.model';
import { BoardId, ColumnId, FileId, TaskId } from '../../../models/ids.model';

// Board
export const openBoard = createAction(ActiveBoardActionType.OPEN_BOARD, props<{ boardId: BoardId }>());

export const loadBoard = createAction('[Board] Load board', props<{ boardId: BoardId }>());
export const loadBoardSuccess = createAction('[Board] Load board success', props<{ board: BoardResponse }>());
export const loadBoardError = createAction('[Board] Load board error', props<{ error: ErrorResponse }>());

// Columns
export const loadColumns = createAction(ActiveBoardActionType.LOAD_COLUMNS, props<{ boardId: BoardId }>());
export const loadColumnsSuccess = createAction(ActiveBoardActionType.LOAD_COLUMNS_SUCCESS, props<{ columns: ColumnResponse[] }>());
export const loadColumnsError = createAction(ActiveBoardActionType.LOAD_COLUMNS_ERROR, props<{ error: ErrorResponse }>());

export const createColumn = createAction(ActiveBoardActionType.CREATE_COLUMN, props<{ boardId: BoardId; columnData: ColumnRequest }>());
export const createColumnSuccess = createAction(ActiveBoardActionType.CREATE_COLUMN_SUCCESS, props<{ column: ColumnResponse }>());
export const createColumnError = createAction(ActiveBoardActionType.CREATE_COLUMN_ERROR, props<{ error: ErrorResponse }>());

export const updateColumn = createAction(ActiveBoardActionType.UPDATE_COLUMN, props<{ boardId: BoardId; columnId: ColumnId; columnData: ColumnRequest }>());
export const updateColumnSuccess = createAction(ActiveBoardActionType.UPDATE_COLUMN_SUCCESS, props<{ column: ColumnResponse }>());
export const updateColumnError = createAction(ActiveBoardActionType.UPDATE_COLUMN_ERROR, props<{ error: ErrorResponse }>());

export const deleteColumn = createAction(ActiveBoardActionType.DELETE_COLUMN, props<{ boardId: BoardId; columnId: ColumnId }>());
export const deleteColumnSuccess = createAction(ActiveBoardActionType.DELETE_COLUMN_SUCCESS, props<{ columnId: ColumnId }>());
export const deleteColumnError = createAction(ActiveBoardActionType.DELETE_COLUMN_ERROR, props<{ error: ErrorResponse }>());

// Tasks
export const loadTasks = createAction(ActiveBoardActionType.LOAD_TASKS, props<{ boardId: BoardId }>());
export const loadTasksSuccess = createAction(ActiveBoardActionType.LOAD_TASKS_SUCCESS, props<{ tasks: TaskResponse[] }>());
export const loadTasksError = createAction(ActiveBoardActionType.LOAD_TASKS_ERROR, props<{ error: ErrorResponse }>());

export const createTask = createAction(ActiveBoardActionType.CREATE_TASK, props<{ boardId: BoardId; columnId: ColumnId; taskData: TaskRequest }>());
export const createTaskSuccess = createAction(ActiveBoardActionType.CREATE_TASK_SUCCESS, props<{ task: TaskResponse }>());
export const createTaskError = createAction(ActiveBoardActionType.CREATE_TASK_ERROR, props<{ error: ErrorResponse }>());

export const updateTask = createAction(ActiveBoardActionType.UPDATE_TASK,	props<{ boardId: BoardId; columnId: ColumnId; taskId: TaskId; taskData: TaskRequest }>());
export const updateTaskSuccess = createAction(ActiveBoardActionType.UPDATE_TASK_SUCCESS,	props<{ task: TaskResponse }>());
export const updateTaskError = createAction(ActiveBoardActionType.UPDATE_TASK_ERROR, props<{ error: ErrorResponse }>());

export const deleteTask = createAction(ActiveBoardActionType.DELETE_TASK,	props<{ boardId: BoardId; columnId: ColumnId; taskId: TaskId }>());
export const deleteTaskSuccess = createAction(ActiveBoardActionType.DELETE_TASK_SUCCESS, props<{ taskId: TaskId }>());
export const deleteTaskError = createAction(ActiveBoardActionType.DELETE_TASK_ERROR, props<{ error: ErrorResponse }>());

// Files
export const loadFiles = createAction(ActiveBoardActionType.LOAD_FILES, props<{ boardId: BoardId }>());
export const loadFilesSuccess = createAction(ActiveBoardActionType.LOAD_FILES_SUCCESS, props<{ files: FileResponse[] }>());
export const loadFilesError = createAction(ActiveBoardActionType.LOAD_FILES_ERROR, props<{ error: ErrorResponse }>());

export const uploadFile = createAction(ActiveBoardActionType.UPLOAD_FILE, props<{ formData: FormData }>());
export const uploadFileSuccess = createAction(ActiveBoardActionType.UPLOAD_FILE_SUCCESS, props<{ files: FileResponse[] }>());
export const uploadFileError = createAction(ActiveBoardActionType.UPLOAD_FILE_ERROR, props<{ error: ErrorResponse }>());

export const deleteFile = createAction(ActiveBoardActionType.DELETE_FILE, props<{ fileId: FileId }>());
export const deleteFileSuccess = createAction(ActiveBoardActionType.DELETE_FILE_SUCCESS, props<{ fileId: FileId }>());
export const deleteFileError = createAction(ActiveBoardActionType.DELETE_FILE_ERROR, props<{ error: ErrorResponse }>());
