import { BoardsState } from '@app/store/models/boards.state';
import { boardsAdapter } from '@app/store/reducers/boards-reducer/boards.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const { selectAll } = boardsAdapter.getSelectors();

export const selectBoardsFeature = createFeatureSelector<BoardsState>('boards');

export const selectBoards = createSelector(selectBoardsFeature, selectAll);

export const selectAllUsersFromMyBoards = createSelector(selectBoards, (boards) =>
	boards.flatMap((board) => board.users),
);
