import { BoardId, UserId } from './ids.model';

export interface BoardRequest {
	title: string;
	owner: string;
	users: UserId[];
}

export interface BoardResponse extends BoardRequest {
	_id: BoardId;
}
