import { createSelector } from '@ngrx/store';
import { selectActiveBoardFeature } from './active-board.selector';

export const selectMembers = createSelector(selectActiveBoardFeature, (state) => state.members.members);
