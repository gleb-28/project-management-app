import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import * as fromBoard from '@app/store/actions/active-board-action/active-board.action';
import { ColumnResponse } from '@app/models/column.model';
import { ReqStatus } from '@app/store/enums/req-status';
import { ColumnsState } from '@app/store/models/active-board.state';

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
