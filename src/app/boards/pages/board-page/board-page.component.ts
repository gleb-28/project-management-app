import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectColumns } from '../../../store/selectors/active-board-selector/columns-selector/columns.selector';
import { openBoard } from '../../../store/actions/active-board-action/active-board.action';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-board-page',
	templateUrl: './board-page.component.html',
	styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit {
	public createColumn() {}

	boardId = this.route.snapshot.params['boardId'];

	columns$ = this.store.select(selectColumns);

	// draggedColumn: ColumnResponse | null = null;

	constructor(private store: Store, private route: ActivatedRoute) {}

	ngOnInit() {
		console.log(this.boardId);
		this.store.dispatch(openBoard({ boardId: this.boardId }));
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
