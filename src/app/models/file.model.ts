import { BoardId, FileId, TaskId } from './ids.model';

export interface FileResponse {
	_id: FileId;
	name: string;
	taskId: TaskId;
	boardId: BoardId;
	path: string;
}
