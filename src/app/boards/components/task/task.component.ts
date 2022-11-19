import { Component, Input, OnInit } from '@angular/core';
import { TaskResponse } from '../../../models/task.model';
import { Store } from '@ngrx/store';
import { ConfirmationService } from 'primeng/api';
import { deleteTask, updateTask } from '../../../store/actions/active-board-action/active-board.action';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-task',
	templateUrl: './task.component.html',
	styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
	@Input() task!: TaskResponse;

	public editTaskModalIsOpen = false;
	public editTaskForm!: FormGroup;

	constructor(private store: Store, private confirmationService: ConfirmationService) {}

	ngOnInit() {
		this.editTaskForm = new FormGroup({
			taskTitle: new FormControl(this.task.title, [
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(30),
			]),
			taskDescription: new FormControl(this.task.description),
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
			message: `Are you sure that you want to delete "${this.task.title}" task?`,
			accept: () => {
				this.store.dispatch(
					deleteTask({
						boardId: this.task.boardId,
						columnId: this.task.columnId,
						taskId: this.task._id,
					}),
				);
				this.confirmationService.close();
			},
			reject: () => {
				this.confirmationService.close();
			},
		});
	}
}