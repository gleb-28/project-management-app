import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BoardResponse } from '@app/models/board.model';
import { updateBoard, deleteBoard } from '@app/store/actions/boards-action/boards.action';
import { Store } from '@ngrx/store';
import { ConfirmationService } from 'primeng/api';

@Component({
	selector: 'app-board',
	templateUrl: './board.component.html',
	styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
	@Input() board!: BoardResponse;

	public boardActions = [
		{
			label: 'Rename',
			icon: 'pi pi-refresh',
			command: () => {
				this.showRenameBoardModal();
			},
		},
		{
			label: 'Add member',
			icon: 'pi pi-plus',
			command: () => {
				this.addMember();
			},
		},
		{ separator: true },
		{
			label: 'Delete',
			icon: 'pi pi-times',
			command: () => {
				this.deleteBoard();
			},
		},
	];

	public renameBoardModalIsOpen = false;
	public renameBoardForm!: FormGroup;

	constructor(private store: Store, private router: Router, private confirmationService: ConfirmationService) {}

	ngOnInit() {
		this.renameBoardForm = new FormGroup({
			boardTitle: new FormControl(this.board.title, [
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(30),
			]),
		});
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
			message: `Are you sure that you want to delete "${this.board.title}" board?`,
			accept: () => {
				this.store.dispatch(deleteBoard({ boardId: this.board._id }));
				this.confirmationService.close();
			},
			reject: () => {
				this.confirmationService.close();
			},
		});
	}

	private addMember() {}

	public openBoard(): void {
		this.router.navigateByUrl(`boards/board/${this.board._id}`);
	}
}
