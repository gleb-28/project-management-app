import { UserState } from './models/user.state';
import { BoardsState } from './models/boards.state';
import { ActiveBoardState } from './models/active-board.state';

export interface AppState {
	user: UserState;
	boards: BoardsState;
	activeBoard: ActiveBoardState;
}
