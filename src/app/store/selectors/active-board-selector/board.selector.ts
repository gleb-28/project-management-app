import { createSelector } from '@ngrx/store';
import { selectActiveBoardFeature } from './active-board.selector';

export const selectBoard = createSelector(selectActiveBoardFeature, (state) => state.board.board);
