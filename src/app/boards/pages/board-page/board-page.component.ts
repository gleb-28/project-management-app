import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ColumnDragDropService } from '@app/boards/services/column-drag-drop/column-drag-drop.service';
import { ColumnResponse } from '@app/models/column.model';
import { openBoard, createColumn, updateColumn } from '@app/store/actions/active-board-action/active-board.action';
import { selectBoard } from '@app/store/selectors/active-board-selector/board.selector';
import { selectColumns } from '@app/store/selectors/active-board-selector/columns.selector';
import { selectMembers } from '@app/store/selectors/active-board-selector/members.selector';
import { selectUser } from '@app/store/selectors/user-selector/user.selector';
import { Store } from '@ngrx/store';
import { take, map } from 'rxjs';

@Component({
	selector: 'app-board-page',
	templateUrl: './board-page.component.html',
	styleUrls: ['./board-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardPageComponent implements OnInit, OnDestroy {
	public user$ = this.store.select(selectUser);
	private boardId = this.route.snapshot.params['boardId'];
	public board$ = this.store.select(selectBoard);
	public members$ = this.store.select(selectMembers);
	public columns$ = this.store.select(selectColumns);
	private columnsAmountSubscription = this.columns$.subscribe((columns) => (this.columnsAmount = columns.length));
	private columnsAmount = 0;

	public createColumnModalIsOpen = false;
	public createColumnForm!: FormGroup;

	public tasksFilter = '';

	constructor(
		private store: Store,
		private route: ActivatedRoute,
		private columnDragDropService: ColumnDragDropService,
	) {}

	public ngOnInit(): void {
		this.store.dispatch(openBoard({ boardId: this.boardId }));

		this.createColumnForm = new FormGroup({
			columnTitle: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
		});
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

	public updateColumnsOrder(deletedColumnOrder: number): void {
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

	public ngOnDestroy(): void {
		this.columnsAmountSubscription.unsubscribe();
	}
}
