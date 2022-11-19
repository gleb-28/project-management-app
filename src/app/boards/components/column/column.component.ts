import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TaskResponse } from '../../../models/task.model';
import { Store } from '@ngrx/store';
import { selectTasksByColumnId } from '../../../store/selectors/active-board-selector/tasks-selector/tasks.selector';
import { Observable, Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { createTask, updateColumn } from '../../../store/actions/active-board-action/active-board.action';
import { ColumnResponse } from '../../../models/column.model';
import { selectUserId } from '../../../store/selectors/user-selector/user.selector';

@Component({
	selector: 'app-column',
	templateUrl: './column.component.html',
	styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit, OnDestroy {
	@Input() column!: ColumnResponse;

	private userId = '';
	private userIdSubscription = this.store.select(selectUserId).subscribe((userId) => (this.userId = userId));
	public tasks$!: Observable<TaskResponse[]>;
	private tasksAmountSubscription!: Subscription;
	public tasksAmount = 0;

	public renameColumnModalIsOpen = false;
	public renameColumnForm!: FormGroup;

	public createTaskModalIsOpen = false;
	public createTaskForm!: FormGroup;

	public draggedTask: TaskResponse | null = null;

	constructor(private store: Store) {}

	ngOnInit() {
		this.tasks$ = this.store.select(selectTasksByColumnId(this.column._id));
		this.tasksAmountSubscription = this.tasks$.subscribe((tasks) => (this.tasksAmount = tasks.length));

		this.renameColumnForm = new FormGroup({
			columnTitle: new FormControl(this.column.title, [
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(30),
			]),
		});

		this.createTaskForm = new FormGroup({
			taskTitle: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
			taskDescription: new FormControl(''),
		});
	}

	public showRenameColumnModal(): void {
		this.renameColumnModalIsOpen = true;
	}

	public showCreateTaskModal(): void {
		this.createTaskModalIsOpen = true;
	}

	public renameColumnSubmit(): void {
		if (this.renameColumnForm.valid) {
			this.store.dispatch(
				updateColumn({
					boardId: this.column.boardId,
					columnId: this.column._id,
					columnData: {
						title: this.renameColumnForm.controls['columnTitle'].value,
						order: this.column.order,
					},
				}),
			);
		}
		this.renameColumnForm.reset();
		this.renameColumnModalIsOpen = false;
	}

	public createTaskSubmit(): void {
		if (this.createTaskForm.valid) {
			this.store.dispatch(
				createTask({
					boardId: this.column.boardId,
					columnId: this.column._id,
					taskData: {
						title: this.createTaskForm.controls['taskTitle'].value,
						description: this.createTaskForm.controls['taskDescription'].value || ' ',
						order: this.tasksAmount + 1,
						userId: this.userId,
						users: [],
					},
				}),
			);
			this.createTaskForm.reset();
			this.createTaskModalIsOpen = false;
		}
	}

	public taskDrop() {
		// 	// console.log(event);
		// 	// if (event.target instanceof HTMLElement) {
		// 	// 	const draggedTaskId = event.target.closest('app-task')?.id;
		// 	// 	console.log(draggedTaskId);
		// 		// this.store.dispatch(
		// 		// 	updateTask({
		// 		// 		boardId: this.draggedTask.boardId,
		// 		// 		columnId: this.draggedTask.columnId,
		// 		// 		taskId: this.draggedTask._id,
		// 		// 		taskData: {
		// 		// 			columnId: columnId,
		// 		// 			title: this.draggedTask.title,
		// 		// 			description: this.draggedTask.description,
		// 		// 			order: tasksAmount + 1,
		// 		// 			userId: this.userId,
		// 		// 			users: this.draggedTask.users,
		// 		// 		},
		// 		// 	}),
		// 		// );
		// 	}
	}

	public dragStart(task: TaskResponse) {
		this.draggedTask = task;
	}

	public dragEnd() {
		this.draggedTask = null;
	}

	ngOnDestroy() {
		this.tasksAmountSubscription.unsubscribe();
		this.userIdSubscription.unsubscribe();
	}
}
