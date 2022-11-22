import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectColumns } from '../../../store/selectors/active-board-selector/columns-selector/columns.selector';
import { createColumn, openBoard, updateColumn } from '../../../store/actions/active-board-action/active-board.action';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SocketioService } from '../../services/socketio/socketio.service';
import { ColumnResponse } from '../../../models/column.model';
import { ColumnDragDropService } from '../../services/column-drag-drop/column-drag-drop.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { map, take } from 'rxjs';

@Component({
	selector: 'app-board-page',
	templateUrl: './board-page.component.html',
	styleUrls: ['./board-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardPageComponent implements OnInit, OnDestroy {
	boardId = this.route.snapshot.params['boardId'];
	columns$ = this.store.select(selectColumns);
	columnsAmountSubscription = this.columns$.subscribe((columns) => (this.columnsAmount = columns.length));
	columnsAmount = 0;

	public createColumnModalIsOpen = false;
	public createColumnForm!: FormGroup;

	// draggedColumn: ColumnResponse | null = null;

	constructor(
		private store: Store,
		private route: ActivatedRoute,
		private columnDragDropService: ColumnDragDropService,
		private socketService: SocketioService,
	) { }

	ngOnInit() {
		this.store.dispatch(openBoard({ boardId: this.boardId }));

		this.createColumnForm = new FormGroup({
			columnTitle: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
		});

		this.socketService.setupSocketConnection();
	}

	public showCreateColumnModal(): void {
		this.createColumnModalIsOpen = true;
	}

	public createColumnSubmit(): void {
		if (this.createColumnForm.valid) {
			this.store.dispatch(
				createColumn({
					boardId: this.boardId,
					columnData: {
						title: this.createColumnForm.controls['columnTitle'].value,
						order: this.columnsAmount + 1,
					},
				}),
			);
			this.createColumnForm.reset();
			this.createColumnModalIsOpen = false;
		}
	}

	public columnDragStart(column: ColumnResponse): void {
		this.columnDragDropService.columnDragStart(column);
	}

	public columnDrop(event: CdkDragDrop<string[]>): void {
		this.columnDragDropService.changeColumnsOrder(event.currentIndex);
	}

	public updateColumnsOrder(deletedColumnOrder: number) {
		this.columns$
			.pipe(
				take(1),
				map((columns) => columns.filter((column) => column.order > deletedColumnOrder)),
			)
			.subscribe((columnsToUpdate) => {
				if (columnsToUpdate.length) {
					columnsToUpdate.forEach((column) => {
						this.store.dispatch(
							updateColumn({
								boardId: column.boardId,
								columnId: column._id,
								columnData: {
									order: column.order - 1,
									title: column.title,
								},
							}),
						);
					});
				}
			});
	}

	ngOnDestroy() {
		this.columnsAmountSubscription.unsubscribe();
	}
}
