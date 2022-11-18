import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
	providedIn: 'root',
})
export class CustomTranslationService {

	lang!: string;

	constructor(private translate: TranslateService, private localStorage: LocalStorageService) {
		this.lang = this.getLangLocalStorage() || this.getBrowserLang();
	}

	private getBrowserLang(): string {
		const browserLang = this.translate.getBrowserLang();
		return browserLang?.match(/en|ru/) ? browserLang : 'en';
	}
	private getLangLocalStorage(): string | null {
		return this.localStorage.get('lang');
	}

}
