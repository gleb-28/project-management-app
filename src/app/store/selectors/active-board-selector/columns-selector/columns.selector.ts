import { columnsAdapter } from '@app/store/reducers/active-board-reducer/columns-reducer/columns.reducer';
import { createSelector } from '@ngrx/store';
import { selectActiveBoardFeature } from '../active-board.selector';

const { selectAll } = columnsAdapter.getSelectors();

export const selectColumnsState = createSelector(selectActiveBoardFeature, (state) => state.columns);

export const selectColumns = createSelector(selectColumnsState, selectAll);
