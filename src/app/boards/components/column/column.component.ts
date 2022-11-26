import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TaskDragDropService } from '@app/boards/services/task-drag-drop/task-drag-drop.service';
import { ErrorMessageService } from '@app/core/services/error-message/error-message.service';
import { ColumnResponse } from '@app/models/column.model';
import { ColumnId } from '@app/models/ids.model';
import { TaskResponse } from '@app/models/task.model';
import { updateColumn, deleteColumn, createTask, updateTask } from '@app/store/actions/active-board-action/active-board.action';
import { selectTasksByColumnId } from '@app/store/selectors/active-board-selector/tasks.selector';
import { selectUserId } from '@app/store/selectors/user-selector/user.selector';
import { Store } from '@ngrx/store';
import { ConfirmationService } from 'primeng/api';
import { Observable, Subscription, take, map } from 'rxjs';

@Component({
	selector: 'app-column',
	templateUrl: './column.component.html',
	styleUrls: ['./column.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
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

	@Output() columnDelete: EventEmitter<number> = new EventEmitter();

	constructor(
		private store: Store,
		private taskDragDropService: TaskDragDropService,
		private confirmationService: ConfirmationService,
		private errorMessage: ErrorMessageService,
	) {}

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

	public deleteColumn(): void {
		this.confirmationService.confirm({
			message: this.errorMessage.getConfirmMessage(this.column.title),
			accept: () => {
				this.store.dispatch(deleteColumn({ boardId: this.column.boardId, columnId: this.column._id }));
				this.columnDelete.emit(this.column.order);
				this.confirmationService.close();
			},
			reject: () => {
				this.confirmationService.close();
			},
		});
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

	public taskDrop(columnId: ColumnId, event: CdkDragDrop<string[]>): void {
		this.taskDragDropService.changeTasksOrder(columnId, event.currentIndex);
	}

	public taskDragStart(task: TaskResponse): void {
		this.taskDragDropService.taskDragStart(task);
	}

	public updateTasksOrder(deletedTaskOrder: number) {
		this.tasks$
			.pipe(
				take(1),
				map((tasks) => tasks.filter((task) => task.order > deletedTaskOrder)),
			)
			.subscribe((tasksToUpdate) => {
				if (tasksToUpdate.length) {
					tasksToUpdate.forEach((task) => {
						this.store.dispatch(
							updateTask({
								boardId: task.boardId,
								columnId: task.boardId,
								taskId: task._id,
								taskData: {
									order: task.order - 1,
									columnId: task.columnId,
									title: task.title,
									description: task.description,
									userId: task.userId,
									users: task.users,
								},
							}),
						);
					});
				}
			});
	}

	ngOnDestroy() {
		this.tasksAmountSubscription.unsubscribe();
		this.userIdSubscription.unsubscribe();
	}
}
