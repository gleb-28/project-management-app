import { State } from './state.model';
import { ColumnResponse } from '../../models/column.model';
import { TaskResponse } from '../../models/task.model';
import { FileResponse } from '../../models/file.model';
import { EntityState } from '@ngrx/entity';

export interface ActiveBoardState extends State {
	columns: ColumnsState;
	tasks: TasksState;
	files: FilesState;
}

export interface ColumnsState extends State, EntityState<ColumnResponse> {}

export interface TasksState extends State, EntityState<TaskResponse> {}

export interface FilesState extends State, EntityState<FileResponse> {}
