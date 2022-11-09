import { State } from './state.model';
import { BoardResponse } from '../../models/board.model';

export interface BoardsState extends State {
	boards: BoardResponse[];
}
