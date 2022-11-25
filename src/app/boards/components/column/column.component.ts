import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { TaskResponse } from '../../../models/task.model';
import { Store } from '@ngrx/store';
import { selectTasksByColumnId } from '../../../store/selectors/active-board-selector/tasks.selector';
import { map, Observable, Subscription, take } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
	createTask,
	deleteColumn,
	updateColumn,
	updateTask,
} from '../../../store/actions/active-board-action/active-board.action';
import { ColumnResponse } from '../../../models/column.model';
import { selectUserId } from '../../../store/selectors/user-selector/user.selector';
import { TaskDragDropService } from '../../services/task-drag-drop/task-drag-drop.service';
import { ColumnId } from '../../../models/ids.model';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ConfirmationService } from 'primeng/api';

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
			message: `Are you sure that you want to delete "${this.column.title}" column?`,
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
