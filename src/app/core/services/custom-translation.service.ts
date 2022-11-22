import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LANGUAGES } from 'src/app/constants/constants';
import { LocalStorageService } from './local-storage.service';

@Injectable({
	providedIn: 'root',
})
export class CustomTranslationService {
	constructor(private translate: TranslateService, private localStorage: LocalStorageService) {
		this.translate.use(this.getUserLang());
	}

	public getUserLang() {
		return this.getLangLocalStorage() || this.getBrowserLang();
	}

	private getBrowserLang(): string {
		const browserLang = this.translate.getBrowserLang();
		if (browserLang) {
			return LANGUAGES.includes(browserLang) ? browserLang : 'en';
		}
		return 'en';
	}

	private getLangLocalStorage(): string | null {
		return this.localStorage.get('lang');
	}

	changeLanguage(lang: string) {
		this.translate.use(lang);
		this.localStorage.set('lang', lang);
	}
}
