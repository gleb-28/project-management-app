import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CustomTranslationService } from '../../services/custom-translation.service';
import { LocalStorageService } from '../../services/local-storage.service';

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

	public selectedLang!: Lang | string;

	public sideBarIsOpen: boolean = false;

	constructor(
		private translate: TranslateService,
		private localStorage: LocalStorageService,
		private customTranslate: CustomTranslationService,
	) {

		this.selectedLang = this.customTranslate.lang;
		this.translate.use(this.selectedLang);
    
		this.langSelect = [
			{ label: 'EN', lang: 'en' },
			{ label: 'RU', lang: 'ru' },
		];
	}

	changeLanguage(lang:Lang | string) {
		this.translate.use(lang);
		this.localStorage.set('lang', lang);
	}
}
