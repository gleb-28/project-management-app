import { UserState } from './models/user.state';
import { BoardsState } from './models/boards.state';

export interface AppState {
	user: UserState;
	boards: BoardsState;
}
