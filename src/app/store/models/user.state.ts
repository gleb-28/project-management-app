import { State } from './state.model';
import { UserId } from '../../models/userId.model';

export interface UserState extends State {
	user: User;
}

export interface User {
	_id: UserId;
	login: string;
	name: string;
}
