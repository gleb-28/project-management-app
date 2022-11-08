import { UserId } from './userId.model';

export interface SignInRequest {
	login: string;
	password: string;
}

export interface SignInResponse {
	token: string;
}

export interface SignUpResponse {
	_id: UserId;
	name: string;
	login: string;
}

export interface SignUpRequest {
	name: string;
	login: string;
	password: string;
}
