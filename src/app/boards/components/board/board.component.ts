import { Component } from '@angular/core';
import { ColumnResponse } from 'src/app/models/column.models';

const mockColumns: Array<ColumnResponse> = [
	{
		_id: '15',
		title: 'string',
		order: 2,
		boardId: 'string',
	},
	{
		_id: '18',
		title: 'string22',
		order: 1,
		boardId: 'string22',
	},
];
@Component({
	selector: 'app-board',
	templateUrl: './board.component.html',
	styleUrls: ['./board.component.scss'],
})

export class BoardComponent {
	columns: Array<ColumnResponse>;

	constructor() {

		this.columns = mockColumns;
	}

}
