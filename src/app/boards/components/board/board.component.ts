import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BoardsService } from '@app/boards/services/boards/boards.service';
import { TranslateUiService } from '@app/core/services/translate-ui/translate-ui.service';
import { SignUpResponse } from '@app/models/auth.model';
import { BoardResponse } from '@app/models/board.model';
import {
	updateBoard,
	deleteBoard,
	addBoardMember,
	deleteBoardMember,
} from '@app/store/actions/boards-action/boards.action';
import { Store } from '@ngrx/store';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-board',
	templateUrl: './board.component.html',
	styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {
	@Input() public board!: BoardResponse;

	public members!: SignUpResponse[];
	private membersSubscription!: Subscription;

	public boardActions = [
		{
			label: this.translateUiService.getUiTranslate('Rename'),
			icon: 'pi pi-eraser',
			command: () => {
				this.showRenameBoardModal();
			},
		},
		{
			label: this.translateUiService.getUiTranslate('Members'),
			icon: 'pi pi-users',
			command: () => {
				this.showMembersModal();
			},
		},
		{ separator: true },
		{
			label: this.translateUiService.getUiTranslate('Delete'),
			icon: 'pi pi-times',
			command: () => {
				this.deleteBoard();
			},
		},
	];

	public renameBoardModalIsOpen = false;
	public renameBoardForm!: FormGroup;
	public addMemberForm!: FormGroup;
	public membersModalIsOpen = false;

	constructor(
		private store: Store,
		private router: Router,
		private confirmationService: ConfirmationService,
		private boardsService: BoardsService,
		private translateUiService: TranslateUiService,
	) {}

	public ngOnInit(): void {
		this.renameBoardForm = new FormGroup({
			boardTitle: new FormControl(this.board.title, [
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(30),
			]),
		});

		this.addMemberForm = new FormGroup({
			login: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
		});

		this.membersSubscription = this.boardsService
			.getBoardMembersByBoardId(this.board._id)
			.subscribe((members) => (this.members = members));
	}

	public showMembersModal(): void {
		this.membersModalIsOpen = true;
	}
	public showRenameBoardModal(): void {
		this.renameBoardModalIsOpen = true;
	}

	public renameBoardSubmit(): void {
		if (this.renameBoardForm.valid) {
			this.store.dispatch(
				updateBoard({
					boardId: this.board._id,
					boardData: {
						title: this.renameBoardForm.controls['boardTitle'].value,
						owner: this.board.owner,
						users: this.board.users,
					},
				}),
			);
			this.renameBoardForm.reset();
			this.renameBoardModalIsOpen = false;
		}
	}

	private deleteBoard(): void {
		this.confirmationService.confirm({
			message: this.translateUiService.getConfirmMessage(this.board.title),
			accept: () => {
				this.store.dispatch(deleteBoard({ boardId: this.board._id }));
				this.confirmationService.close();
			},
			reject: () => {
				this.confirmationService.close();
			},
		});
	}

	public addMember(): void {
		if (this.addMemberForm.valid) {
			this.store.dispatch(
				addBoardMember({
					login: this.addMemberForm.value.login,
					boardId: this.board._id,
					boardData: {
						title: this.board.title,
						owner: this.board.owner,
						users: this.board.users,
					},
				}),
			);

			this.addMemberForm.reset();
		}
	}

	public deleteMember(id: string): void {
		let newMembers = [...this.board.users].filter((idMember) => idMember !== id);
		this.store.dispatch(
			deleteBoardMember({
				members: newMembers,
				boardId: this.board._id,
				boardData: {
					title: this.board.title,
					owner: this.board.owner,
					users: this.board.users,
				},
			}),
		);
		this.membersModalIsOpen = false;
	}

	public openBoard(): void {
		this.router.navigateByUrl(`boards/board/${this.board._id}`);
	}

	public ngOnDestroy(): void {
		this.membersSubscription.unsubscribe();
	}
}
