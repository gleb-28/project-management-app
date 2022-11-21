import { Component } from '@angular/core';
import { CustomTranslationService } from '../../services/custom-translation.service';


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

	constructor( private customTranslate: CustomTranslationService ) {

		this.selectedLang = this.customTranslate.getUserLang();

		this.langSelect = [
			{ label: 'EN', lang: 'en' },
			{ label: 'RU', lang: 'ru' },
		];
	}

	changeLanguage(lang:Lang | string) {
		this.customTranslate.changeLanguage(lang);
	}
}
