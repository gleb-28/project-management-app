import { BoardId, ColumnId } from './ids.model';

export interface ColumnRequest {
	_id?: ColumnId;
	title?: string;
	order: number;
	boardId?: BoardId;
}

export interface ColumnResponse {
	_id: ColumnId;
	title: string;
	order: number;
	boardId: BoardId;
}
