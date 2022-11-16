import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

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
	public langSelect: LangSelect[];

	public selectedLang: Lang = 'en';

	public sideBarIsOpen: boolean = false;

	constructor(private translate: TranslateService) {

		this.langSelect = [
			{ label: 'EN', lang: 'en' },
			{ label: 'RU', lang: 'ru' },
		];
	}

	changeLanguage(lang:Lang) {
		this.translate.use(lang);
	}
}
