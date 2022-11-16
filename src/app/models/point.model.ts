import { BoardId, PointId, TaskId } from './ids.model';

export interface PointRequest {
	_id?: PointId;
	title?: string;
	taskId?: TaskId;
	boardId?: BoardId;
	done: boolean;
}

export interface PointResponse {
	_id: PointId;
	name?: string;
	title?: string;
	order?: number;
	taskId?: TaskId;
	boardId: BoardId;
	path?: string;
	done?: boolean;
}
