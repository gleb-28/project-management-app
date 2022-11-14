import { Component } from '@angular/core';
import { BoardResponse } from 'src/app/models/board.models';

const mockBoards = [
	{
		_id: 'id1',
		title: 'string',
		owner: 'string',
		users: ['id1', 'id2'],
	},
	{
		_id: 'id2',
		title: 'string2',
		owner: 'string2',
		users: ['id1', 'id2'],
	},
];

@Component({
	selector: 'app-main',
	templateUrl: './main-page.component.html',
	styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
	boards: Array<BoardResponse> = [];

	draggedBoard: BoardResponse | null = null;

	constructor() {
		this.boards = mockBoards;
	}

	dragStart(board: BoardResponse) {
		this.draggedBoard = board;
	}

	drop() {
		if (this.draggedBoard) {
			this.draggedBoard = null;
		}
	}

	dragEnd() {
		this.draggedBoard = null;
	}
}
