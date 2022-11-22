import { createSelector } from '@ngrx/store';
import { selectActiveBoardFeature } from '../active-board.selector';

export const selectBoardState = createSelector(selectActiveBoardFeature, (state) => state.board);
