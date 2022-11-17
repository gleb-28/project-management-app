import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
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

	public selectedLang: Lang | string = 'en';

	public sideBarIsOpen: boolean = false;

	constructor(private translate: TranslateService, private localStorage: LocalStorageService) {
    let lang: string | null = this.localStorage.get('lang');
    if(lang){
      this.selectedLang = lang
      this.translate.use(lang);
    } else{
      const browserLang = translate.getBrowserLang() || 'en'
      this.selectedLang = browserLang
      this.translate.use(browserLang);
    }

		this.langSelect = [
			{ label: 'EN', lang: 'en' },
			{ label: 'RU', lang: 'ru' },
		];
	}

	changeLanguage(lang:Lang | string) {
		this.translate.use(lang);
    this.localStorage.set('lang', lang)
	}
}
