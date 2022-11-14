export enum ActiveBoardActionType {
	// Board
	OPEN_BOARD = '[Board] Open board',

	// Columns
	LOAD_COLUMNS = '[Board] Load columns',
	LOAD_COLUMNS_SUCCESS = '[Board] Load columns success',
	LOAD_COLUMNS_ERROR = '[Board] Load columns error',

	CREATE_COLUMN = '[Board] Create column',
	CREATE_COLUMN_SUCCESS = '[Board] Create column success',
	CREATE_COLUMN_ERROR = '[Board] Create column error',

	UPDATE_COLUMN = '[Board] Update column',
	UPDATE_COLUMN_SUCCESS = '[Board] Update column success',
	UPDATE_COLUMN_ERROR = '[Board] Update column error',

	DELETE_COLUMN = '[Board] Delete column',
	DELETE_COLUMN_SUCCESS = '[Board] Delete column success',
	DELETE_COLUMN_ERROR = '[Board] Delete column error',

	// Tasks
	LOAD_TASKS = '[Board] Load tasks',
	LOAD_TASKS_SUCCESS = '[Board] Load tasks success',
	LOAD_TASKS_ERROR = '[Board] Load tasks error',

	CREATE_TASK = '[Board] Create task',
	CREATE_TASK_SUCCESS = '[Board] Create task success',
	CREATE_TASK_ERROR = '[Board] Create task error',

	UPDATE_TASK = '[Board] Update task',
	UPDATE_TASK_SUCCESS = '[Board] Update task success',
	UPDATE_TASK_ERROR = '[Board] Update task error',

	DELETE_TASK = '[Board] Delete task',
	DELETE_TASK_SUCCESS = '[Board] Delete task success',
	DELETE_TASK_ERROR = '[Board] Delete task error',

	// Files
	LOAD_FILES = '[Board] Load files',
	LOAD_FILES_SUCCESS = '[Board] Load files success',
	LOAD_FILES_ERROR = '[Board] Load files error',

	UPLOAD_FILE = '[Board] Upload file',
	UPLOAD_FILE_SUCCESS = '[Board] Upload file success',
	UPLOAD_FILE_ERROR = '[Board] Upload file error',

	DELETE_FILE = '[Board] Delete file',
	DELETE_FILE_SUCCESS = '[Board] Delete file success',
	DELETE_FILE_ERROR = '[Board] Delete file error',
}
