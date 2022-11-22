import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectColumns } from '../../../store/selectors/active-board-selector/columns-selector/columns.selector';
import { ColumnResponse } from '../../../models/column.model';
import { updateColumn } from '../../../store/actions/active-board-action/active-board.action';

@Injectable()
export class ColumnDragDropService {
	private columns$ = this.store.select(selectColumns).subscribe((columns) => (this.columns = columns));
	private columns: ColumnResponse[] = [];
	private draggedColumn: ColumnResponse | null = null;

	constructor(private store: Store) {}

	public columnDragStart(column: ColumnResponse): void {
		this.draggedColumn = column;
	}

	private columnDragEnd(): void {
		this.draggedColumn = null;
	}

	public changeColumnsOrder(columnCurrentIndex: number): void {
		if (this.draggedColumn) {
			const draggedColumn = this.draggedColumn;
			const newDraggedColumnOrder = columnCurrentIndex + 1;

			// if column order didn't change
			if (draggedColumn.order === newDraggedColumnOrder) return this.columnDragEnd();

			const draggedColumnNextItemOrder = draggedColumn.order + 1;
			const draggedColumnNewPrevItemOrder = newDraggedColumnOrder;

			// column drugged right
			if (newDraggedColumnOrder > draggedColumn.order) {
				for (let i = draggedColumnNextItemOrder; i <= draggedColumnNewPrevItemOrder; i++) {
					const nextColumnToChange = this.getColumnByOrder(i);
					if (nextColumnToChange) {
						this.dispatchChangeColumnOrderAction(nextColumnToChange, i - 1);
					}
				}
			}
			// column dragged left
			if (newDraggedColumnOrder < draggedColumn.order) {
				for (let i = newDraggedColumnOrder; i <= this.columns.length; i++) {
					const nextColumnToChange = this.getColumnByOrder(i);
					if (nextColumnToChange) {
						this.dispatchChangeColumnOrderAction(nextColumnToChange, i + 1);
					}
				}
			}
			this.dispatchChangeColumnOrderAction(draggedColumn, newDraggedColumnOrder);
			this.columnDragEnd();
		}
	}

	private dispatchChangeColumnOrderAction(column: ColumnResponse, newOrder: number): void {
		this.store.dispatch(
			updateColumn({
				boardId: column.boardId,
				columnId: column._id,
				columnData: {
					order: newOrder,
					title: column.title,
				},
			}),
		);
	}

	private getColumnByOrder(order: number): ColumnResponse | undefined {
		return this.columns.find((column) => column.order === order);
	}
}
