import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { ColumnResponse } from '../../../../models/column.model';
import { ColumnsState } from '../../../models/active-board.state';
import { ReqStatus } from '../../../enums/req-status';
import { createReducer, on } from '@ngrx/store';
import * as fromBoard from '../../../actions/active-board-action/active-board.action';

export const columnsAdapter: EntityAdapter<ColumnResponse> = createEntityAdapter<ColumnResponse>({
	selectId: (column) => column._id,
	sortComparer: (a, b) => a.order - b.order,
});

export const columnsInitialState: ColumnsState = columnsAdapter.getInitialState({
	status: ReqStatus.Pending,
	error: null,
});

export const columnsReducer = createReducer(
	columnsInitialState,
	on(
		fromBoard.loadColumns,
		fromBoard.createColumn,
		fromBoard.updateColumn,
		fromBoard.deleteColumn,
		(state): ColumnsState => ({
			...state,
			status: ReqStatus.Loading,
		}),
	),

	on(fromBoard.loadColumnsSuccess, (state, { columns }): ColumnsState => {
		return columnsAdapter.setAll(columns, { ...state, status: ReqStatus.Success, error: null });
	}),

	on(fromBoard.createColumnSuccess, (state, { column }): ColumnsState => {
		return columnsAdapter.addOne(column, { ...state, status: ReqStatus.Success, error: null });
	}),

	on(fromBoard.updateColumnSuccess, (state, { column }): ColumnsState => {
		return columnsAdapter.setOne(column, { ...state, status: ReqStatus.Success, error: null });
	}),

	on(fromBoard.deleteColumnSuccess, (state, { columnId }): ColumnsState => {
		return columnsAdapter.removeOne(columnId, { ...state, status: ReqStatus.Success, error: null });
	}),

	on(
		fromBoard.loadColumnsError,
		fromBoard.createColumnError,
		fromBoard.updateColumnError,
		fromBoard.deleteColumnError,
		(state, { error }): ColumnsState => ({
			...state,
			status: ReqStatus.Error,
			error,
		}),
	),
);
