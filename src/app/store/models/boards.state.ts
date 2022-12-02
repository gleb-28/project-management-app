import { State } from './state.model';
import { EntityState } from '@ngrx/entity';
import { BoardResponse } from '@app/models/board.model';

export interface BoardsState extends State, EntityState<BoardResponse> {}
