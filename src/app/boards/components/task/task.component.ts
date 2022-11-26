import { Component, ChangeDetectionStrategy, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ErrorMessageService } from '@app/core/services/error-message/error-message.service';
import { SignUpResponse } from '@app/models/auth.model';
import { TaskResponse } from '@app/models/task.model';
import { updateTask, deleteTask } from '@app/store/actions/active-board-action/active-board.action';
import { selectMembers } from '@app/store/selectors/active-board-selector/members.selector';
import { Store } from '@ngrx/store';
import { ConfirmationService } from 'primeng/api';


@Component({
	selector: 'app-task',
	templateUrl: './task.component.html',
	styleUrls: ['./task.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent implements OnInit {
	@Input() task!: TaskResponse;
	private members$ = this.store.select(selectMembers);
	public assignedUsers: SignUpResponse[] = [];

	public editTaskModalIsOpen = false;
	public editTaskForm!: FormGroup;

	@Output() taskDelete: EventEmitter<number> = new EventEmitter();

	constructor(private store: Store, private confirmationService: ConfirmationService,
		private errorMessage: ErrorMessageService) {}

	ngOnInit() {
		this.editTaskForm = new FormGroup({
			taskTitle: new FormControl(this.task.title, [
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(30),
			]),
			taskDescription: new FormControl(this.task.description),
		});

		this.members$.subscribe((members) => {
			this.assignedUsers = members.filter((member) => this.task.users.includes(member._id));
			// TODO: show assigned members to task
		});
	}

	public showEditTaskModal(): void {
		this.editTaskModalIsOpen = true;
	}

	public editTaskSubmit(): void {
		if (this.editTaskForm.valid) {
			this.store.dispatch(
				updateTask({
					boardId: this.task.boardId,
					columnId: this.task.columnId,
					taskId: this.task._id,
					taskData: {
						columnId: this.task.columnId,
						title: this.editTaskForm.controls['taskTitle'].value,
						description: this.editTaskForm.controls['taskDescription'].value || '',
						order: this.task.order,
						userId: this.task.userId,
						users: [],
					},
				}),
			);
			this.editTaskForm.reset();
			this.editTaskModalIsOpen = false;
		}
	}

	public deleteTask(): void {
		this.confirmationService.confirm({
			message: this.errorMessage.getConfirmMessage(this.task.title),
			accept: () => {
				this.store.dispatch(
					deleteTask({
						boardId: this.task.boardId,
						columnId: this.task.columnId,
						taskId: this.task._id,
					}),
				);
				this.taskDelete.emit(this.task.order);
				this.confirmationService.close();
			},
			reject: () => {
				this.confirmationService.close();
			},
		});
	}
}
