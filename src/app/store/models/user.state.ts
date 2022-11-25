import { State } from './state.model';
import { UserId } from '@app/models/ids.model';

export interface UserState extends State {
	user: User;
}

export interface User {
	_id: UserId;
	login: string;
	name: string;
}
