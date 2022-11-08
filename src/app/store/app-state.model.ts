import { UserState } from './models/user-state.state';
import { BoardsState } from './models/boards-state.model';

export interface AppState {
	user: UserState;
	boards: BoardsState;
}
