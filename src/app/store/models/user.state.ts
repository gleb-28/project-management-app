import { State } from './state.model';
import { UserId } from '../../models/userId.model';
import { ReqStatus } from '../enums/req-status';

export interface UserState extends State {
	user: User | null;
}

export interface User {
	_id: UserId;
	login: string;
	name: string;
}

export const defaultUserState: UserState = {
	user: {
		_id: '',
		login: '',
		name: '',
	},
	status: ReqStatus.Loading,
	error: '',


};
