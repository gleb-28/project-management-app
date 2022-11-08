import { UserId } from './userId.model';

export interface FileResponse {
	_id: UserId;
	name: string;
	taskId: string;
	boardId: string;
	path: string;
}
