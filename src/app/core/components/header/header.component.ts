import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomTranslationService } from '@app/core/services/custom-translation.service';
import { Lang } from '@app/models/lang.model';
import { createBoard } from '@app/store/actions/boards-action/boards.action';
import { selectIsLogged, selectUser } from '@app/store/selectors/user-selector/user.selector';

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

	public langSelect: LangSelect[] = [
		{ label: 'EN', lang: 'en' },
		{ label: 'RU', lang: 'ru' },
	];

	public selectedLang: Lang = this.customTranslate.getUserLang() as Lang;

	public sideBarIsOpen = false;
	public createBoardModalIsOpen = false;
	public createBoardForm!: FormGroup;

	constructor(private store: Store, private customTranslate: CustomTranslationService) {}

	ngOnInit() {
		this.createBoardForm = new FormGroup({
			boardTitle: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
		});
	}

	public changeLanguage(lang: Lang) {
		this.customTranslate.changeLanguage(lang);
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
		// TODO: dispatch logout action
	}

	ngOnDestroy() {
		this.userSubscription.unsubscribe();
	}
}
