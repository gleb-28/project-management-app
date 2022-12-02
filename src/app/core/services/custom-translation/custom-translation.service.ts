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
		const userLang = this.getLocalStorageLang() || this.getBrowserLang();

		if (userLang) {
			return LANGUAGES.includes(userLang) ? userLang : 'en';
		}
		return 'en';
	}

	private getBrowserLang(): string | undefined {
		return this.translate.getBrowserLang();
	}

	private getLocalStorageLang(): string | null {
		return this.localStorage.get('lang');
	}

	public changeLanguage(lang: string): void {
		this.translate.use(lang);
		this.localStorage.set('lang', lang);
	}
}
