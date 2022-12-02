import { Injectable } from '@angular/core';
import { ERROR_MESSAGES } from '@app/constants/constants';
import { LocalStorageService } from '@app/core/services/local-storage/local-storage.service';
import { UI_TRANSLATION } from '../../../../assets/translations/ui-translations';
import { CustomTranslationService } from '@app/core/services/custom-translation/custom-translation.service';

@Injectable({
	providedIn: 'root',
})
export class TranslateUiService {
	get lang() {
		return this.customTranslationService.getUserLang();
	}
	constructor(
		private localStorageService: LocalStorageService,
		private customTranslationService: CustomTranslationService,
	) {}
	getError(key: number | string) {
		return ERROR_MESSAGES[this.lang][key] || ERROR_MESSAGES[this.lang][400];
	}

	public getConfirmMessage(title: string): string {
		return `${UI_TRANSLATION['ARE_YOU_SURE_DELETE'][this.lang]} "${title}"?`;
	}

	getUiTranslate(text: string): string {
		const key = text.toUpperCase();

		return UI_TRANSLATION[key][this.lang];
	}
}
