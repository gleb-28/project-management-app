import { UserId } from './ids.model';

export enum SocketActions {
	ADD = 'add',
	UPDATE = 'update',
	DELETE = 'delete',
}

export enum SocketEvents {
	USERS = 'users',
	BOARDS = 'boards',
	COLUMNS = 'columns',
	TASKS = 'tasks',
	FILES = 'files',
	POINTS = 'points',
}

export interface SocketMessage {
	action: SocketActions, // Change type in database
	users: Array<UserId>, // List of id users who have access to data about updating something in the database (For example, when changing a column, there will be a list of the owner of the board and users invited to it)
	ids: Array<string>, // List of id's of created/modified/deleted records in the database
	guid: string, // Unique request code (Assigned in the backend request Guid header)
	notify: boolean, // Whether to notify the current user about changes in the database
	initUser: string,  // id of the user who initiated the changes in the database (Assigned in the initUser header of the backend request)
}
