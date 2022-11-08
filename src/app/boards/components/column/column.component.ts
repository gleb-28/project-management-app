import { Component, Input } from '@angular/core';
import { TaskResponse } from 'src/app/models/task.models';


const mockTasks: Array<TaskResponse> = [
	{
		_id: 'UserId',
		title: 'string',
		order: 1,
		boardId: 'string',
		columnId: 'string',
		description: 'string',
		userId: 'string',
		users: ['2', '5'],
	},
	{
		_id: 'UserId1',
		title: 'string2',
		order: 2,
		boardId: 'string2',
		columnId: 'string2',
		description: 'string2',
		userId: 'string2',
		users: ['2', '5'],
	},
	{
		_id: 'UserId3',
		title: 'string3',
		order: 3,
		boardId: 'string3',
		columnId: 'string3',
		description: 'string3',
		userId: 'string3',
		users: ['2', '5'],
	},
];
@Component({
	selector: 'app-column',
	templateUrl: './column.component.html',
	styleUrls: ['./column.component.scss'],
})
export class ColumnComponent {
	@Input() columnId = '';

	@Input() columnTitle = '';

	taskItems: Array<TaskResponse> = [];

	draggedTask: TaskResponse | null = null;

	constructor() {
		this.taskItems = mockTasks;
	}

	dragStart(task: TaskResponse) {
		this.draggedTask = task;
	}

	drop() {
		if (this.draggedTask) {
			this.taskItems = this.taskItems.filter((task) => this.draggedTask?._id !== task?._id);
			this.draggedTask = null;
		}
	}

	dragEnd() {
		this.draggedTask = null;
	}
}
