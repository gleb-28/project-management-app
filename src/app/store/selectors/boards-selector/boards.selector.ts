import { BoardsState } from '../../models/boards.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { boardsAdapter } from '../../reducers/boards-reducer/boards.reducer';

const { selectAll } = boardsAdapter.getSelectors();

export const selectBoardsFeature = createFeatureSelector<BoardsState>('boards');

export const selectBoards = createSelector(selectBoardsFeature, selectAll);

export const selectAllUsersFromMyBoards = createSelector(selectBoards, (boards) => boards.map((board) => board.users));
