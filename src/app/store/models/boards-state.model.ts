import { State } from './state.model';
import { BoardResponse } from '../../models/board.models';

export interface BoardsState extends State {
	boards: BoardResponse[];
}
