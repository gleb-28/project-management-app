import { State } from './state.model';
import { ColumnResponse } from '../../models/column.model';
import { TaskResponse } from '../../models/task.model';
import { FileResponse } from '../../models/file.model';
import { EntityState } from '@ngrx/entity';
import { BoardResponse } from '../../models/board.model';
import { SignUpResponse } from '../../models/auth.model';

export interface ActiveBoardState extends State {
	board: BoardState;
	members: MembersState;
	columns: ColumnsState;
	tasks: TasksState;
	files: FilesState;
}

export interface BoardState extends State {
	board: BoardResponse | null;
}

export interface MembersState extends State {
	members: SignUpResponse[];
}

export interface ColumnsState extends State, EntityState<ColumnResponse> {}

export interface TasksState extends State, EntityState<TaskResponse> {}

export interface FilesState extends State, EntityState<FileResponse> {}
