import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomTranslationService } from '@app/core/services/custom-translation/custom-translation.service';
import { Lang } from '@app/models/lang.model';
import { createBoard } from '@app/store/actions/boards-action/boards.action';
import { logout } from '@app/store/actions/user-action/user.action';
import { selectIsLogged, selectUser } from '@app/store/selectors/user-selector/user.selector';
import { Store } from '@ngrx/store';


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

	public windowWidth = window.innerWidth;
	@HostListener('window:resize', ['$event.target']) handleResize(event: Window) {
		this.windowWidth = event.innerWidth;
	}

	constructor(private store: Store, private customTranslate: CustomTranslationService) {}

	public ngOnInit():void {
		this.createBoardForm = new FormGroup({
			boardTitle: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
		});
	}

	public changeLanguage(lang: Lang): void {
		this.customTranslate.changeLanguage(lang);
	}

	public showCreateBoardModal(): void {
		if (this.sideBarIsOpen) this.sideBarIsOpen = false;
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
		if (this.sideBarIsOpen) this.sideBarIsOpen = false;
		this.store.dispatch(logout());
	}

	public ngOnDestroy(): void {
		this.userSubscription.unsubscribe();
	}
}
