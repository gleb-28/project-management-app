import { State } from './state.model';
import { UserId } from '../../models/ids.model';

export interface UserState extends State {
	user: User | null;
}

export interface User {
	id: UserId;
	login: string;
	name: string;
}
