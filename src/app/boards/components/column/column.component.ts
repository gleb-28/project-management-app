import { Component, Input, OnInit } from '@angular/core';
import { TaskResponse } from '../../../models/task.model';
import { Store } from '@ngrx/store';
import { selectTasksByColumnId } from '../../../store/selectors/active-board-selector/tasks-selector/tasks.selector';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-column',
	templateUrl: './column.component.html',
	styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit {
	@Input() columnId = '';

	@Input() columnTitle = '';

	tasks$!: Observable<TaskResponse[]>;

	draggedTask: TaskResponse | null = null;

	constructor(private store: Store) {}

	ngOnInit() {
		this.tasks$ = this.store.select(selectTasksByColumnId(this.columnId));
	}

	dragStart(task: TaskResponse) {
		this.draggedTask = task;
	}

	drop() {
		if (this.draggedTask) {
			// this.taskItems = this.taskItems.filter((task) => this.draggedTask?._id !== task?._id);
			this.draggedTask = null;
		}
	}

	dragEnd() {
		this.draggedTask = null;
	}

	addColumn() {}

	addTask() {}
}
