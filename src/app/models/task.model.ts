import { BoardId, ColumnId, TaskId, UserId } from './ids.model';

export interface TaskRequest {
	_id?: TaskId;
	title?: string;
	order: number;
	description?: string;
	columnId?: ColumnId;
	userId?: UserId;
	users?: UserId[];
}

export interface TaskResponse {
	_id: TaskId;
	title: string;
	order: number;
	boardId: BoardId;
	columnId: ColumnId;
	description: string;
	userId: UserId;
	users: UserId[];
}
