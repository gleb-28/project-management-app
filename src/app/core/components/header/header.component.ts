import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsLogged, selectUser } from '../../../store/selectors/user-selector/user.selector';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { createBoard } from '../../../store/actions/boards-action/boards.action';
import { logout } from 'src/app/store/actions/user-action/user.action';

type Lang = 'en' | 'ru';

interface LangSelect {
	label: 'EN' | 'RU';
	lang: 'en' | 'ru';
}

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
	public isLogged$ = this.store.select(selectIsLogged);
	private userSubscription = this.store.select(selectUser).subscribe((user) => (this.userId = user._id));
	private userId = '';

	public langSelect: LangSelect[];
	public selectedLang: Lang = 'en';

	public sideBarIsOpen = false;
	public createBoardModalIsOpen = false;
	public createBoardForm!: FormGroup;

	constructor(private store: Store) {
		this.langSelect = [
			{ label: 'EN', lang: 'en' },
			{ label: 'RU', lang: 'ru' },
		];
	}

	ngOnInit() {
		this.createBoardForm = new FormGroup({
			boardTitle: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
		});
	}

	public showCreateBoardModal(): void {
		this.createBoardModalIsOpen = true;
	}

	public createBoardSubmit(): void {
		if (this.createBoardForm.valid) {
			this.store.dispatch(
				createBoard({
					boardData: {
						title: this.createBoardForm.controls['boardTitle'].value,
						owner: this.userId,
						users: [],
					},
				}),
			);
			this.createBoardForm.reset();
			this.createBoardModalIsOpen = false;
		}
	}

	public logout(): void {
		this.store.dispatch(logout());
	}

	ngOnDestroy() {
		this.userSubscription.unsubscribe();
	}
}
