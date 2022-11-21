import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectColumns } from '../../../store/selectors/active-board-selector/columns-selector/columns.selector';
import { createColumn, openBoard } from '../../../store/actions/active-board-action/active-board.action';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SocketioService } from '../../services/socketio/socketio.service';

@Component({
	selector: 'app-board-page',
	templateUrl: './board-page.component.html',
	styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit, OnDestroy {
	boardId = this.route.snapshot.params['boardId'];
	columns$ = this.store.select(selectColumns);
	columnsAmountSubscription = this.columns$.subscribe((columns) => (this.columnsAmount = columns.length));
	columnsAmount = 0;

	public createColumnModalIsOpen = false;
	public createColumnForm!: FormGroup;

	// draggedColumn: ColumnResponse | null = null;

	constructor(private store: Store, private route: ActivatedRoute, private socketService: SocketioService) { }

	ngOnInit() {
		this.store.dispatch(openBoard({ boardId: this.boardId }));

		this.createColumnForm = new FormGroup({
			columnTitle: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
		});

		this.socketService.setupSocketConnection();
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

	public showCreateColumnModal(): void {
		this.createColumnModalIsOpen = true;
	}

	ngOnDestroy() {
		this.columnsAmountSubscription.unsubscribe();
	}

	// dragStart(column: ColumnResponse) {
	// 	this.draggedColumn = column;
	// }
	//
	// drop() {
	// 	if (this.draggedColumn) {
	// 		this.draggedColumn = null;
	// 	}
	// }
	//
	// dragEnd() {
	// 	this.draggedColumn = null;
	// }
}
