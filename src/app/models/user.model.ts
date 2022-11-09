import { UserId } from './userId.model';

export interface UserRequest {
	name: string;
	login: string;
	password: string;
}

export interface UserResponse {
	_id: UserId;
	name: string;
	login: string;
}


