import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsLogged } from '../../../store/selectors/user-selector/user.selector';

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
export class HeaderComponent {
	isLogged$ = this.store.select(selectIsLogged);

	public langSelect: LangSelect[];

	public selectedLang: Lang = 'en';

	public sideBarIsOpen: boolean = false;

	constructor(private store: Store) {
		this.langSelect = [
			{ label: 'EN', lang: 'en' },
			{ label: 'RU', lang: 'ru' },
		];
	}

	public logout() {
		// TODO: dispatch logout action
	}
}
