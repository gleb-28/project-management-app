import { State } from './state.model';
import { EntityState } from '@ngrx/entity';
import { BoardResponse } from '@app/models/board.model';
import { ColumnResponse } from '@app/models/column.model';
import { FileResponse } from '@app/models/file.model';
import { TaskResponse } from '@app/models/task.model';

export interface ActiveBoardState extends State {
	board: BoardState;
	columns: ColumnsState;
	tasks: TasksState;
	files: FilesState;
}

export interface BoardState extends State {
	board: BoardResponse | null;
}

export interface ColumnsState extends State, EntityState<ColumnResponse> {}

export interface TasksState extends State, EntityState<TaskResponse> {}

export interface FilesState extends State, EntityState<FileResponse> {}
