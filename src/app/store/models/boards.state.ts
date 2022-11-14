import { State } from './state.model';
import { BoardResponse } from '../../models/board.model';
import { EntityState } from '@ngrx/entity';

export interface BoardsState extends State, EntityState<BoardResponse> {}
