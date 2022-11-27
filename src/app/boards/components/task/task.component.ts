import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateUiService } from '@app/core/services/translate-ui/translate-ui.service';
import { SignUpResponse } from '@app/models/auth.model';
import { TaskResponse } from '@app/models/task.model';
import { updateTask, deleteTask } from '@app/store/actions/active-board-action/active-board.action';
import { selectMembers } from '@app/store/selectors/active-board-selector/members.selector';
import { Store } from '@ngrx/store';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { selectUser } from '@app/store/selectors/user-selector/user.selector';

@Component({
	selector: 'app-task',
	templateUrl: './task.component.html',
	styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit, OnDestroy {
	@Input() task!: TaskResponse;
	private user!: SignUpResponse;
	private userSubscription!: Subscription;
	private membersSubscription!: Subscription;
	public members: SignUpResponse[] = [];
	public assignedMembers: SignUpResponse[] = [];

	public editTaskModalIsOpen = false;
	public editTaskForm!: FormGroup;
	public assignMemberForm!: FormGroup;

	@Output() taskDelete: EventEmitter<number> = new EventEmitter();

	constructor(
		private store: Store,
		private confirmationService: ConfirmationService,
		private cdr: ChangeDetectorRef,
		private errorMessage: TranslateUiService,
	) {}

	public ngOnInit(): void {
		this.editTaskForm = new FormGroup({
			taskTitle: new FormControl(this.task.title, [
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(30),
			]),
			taskDescription: new FormControl(this.task.description),
		});

		this.userSubscription = this.store.select(selectUser).subscribe((user) => {
			this.user = user;
		});

		this.membersSubscription = this.store.select(selectMembers).subscribe((members) => {
			this.members = members;
			this.assignedMembers = members.filter((member) => this.task.users.includes(member._id));
			if (this.task.users.includes(this.user._id)) this.assignedMembers = [...this.assignedMembers, this.user];
			this.cdr.markForCheck();
		});

		this.assignMemberForm = new FormGroup({
			login: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
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
						users: this.task.users,
					},
				}),
			);
			this.editTaskForm.reset();
			this.editTaskModalIsOpen = false;
		}
	}

	public assignMember(): void {
		if (this.assignMemberForm.valid) {
			if (this.assignedMembers.find((member) => member.login === this.assignMemberForm.value.login)) {
				this.assignMemberForm.reset();
				this.editTaskModalIsOpen = false;
			}

			let memberToAssign = this.members.find((member) => member.login === this.assignMemberForm.value.login);
			if (!memberToAssign && this.user.login === this.assignMemberForm.value.login) memberToAssign = this.user;
			if (memberToAssign) {
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
							users: [...this.task.users, memberToAssign._id],
						},
					}),
				);
			}
			this.assignMemberForm.reset();
			this.editTaskModalIsOpen = false;
		}
	}

	public deleteMember(memberId: string) {
		const newMembers = this.assignedMembers.filter((member) => member._id !== memberId).map((member) => member._id);
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
					users: newMembers,
				},
			}),
		);
		this.assignMemberForm.reset();
		this.editTaskModalIsOpen = false;
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

	public ngOnDestroy(): void {
		this.userSubscription.unsubscribe();
		this.membersSubscription.unsubscribe();
	}
}
