import { Injectable } from '@angular/core';
import { LANGUAGES } from '@app/constants/constants';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
	providedIn: 'root',
})
export class CustomTranslationService {
	constructor(private translate: TranslateService, private localStorage: LocalStorageService) {
		this.translate.use(this.getUserLang());
	}

	public getUserLang(): string {
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

	public changeLanguage(lang: string): void {
		this.translate.use(lang);
		this.localStorage.set('lang', lang);
	}
}
