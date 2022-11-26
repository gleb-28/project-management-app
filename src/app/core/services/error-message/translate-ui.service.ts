import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { ERROR_MESSAGES_EN, ERROR_MESSAGES_RU } from '@app/constants/constants';
import { UI_TRANSLATION } from '../../../../assets/translations/ui-translations';

@Injectable({
	providedIn: 'root',
})
export class TranslateUiService {
	constructor(private localStorageService: LocalStorageService) {}

	getError(key: number | string) {
		if (this.isRuLang()) {
			return ERROR_MESSAGES_RU[key] || ERROR_MESSAGES_RU[400];
		} else {
			return ERROR_MESSAGES_EN[key] || ERROR_MESSAGES_EN[400];
		}
	}

	public getConfirmMessage(title: string): string {
		if (this.isRuLang()) {
			return `${UI_TRANSLATION['ARE_YOU_SURE_DELETE']['RU']} "${title}"?`;
		} else {
			return `${UI_TRANSLATION['ARE_YOU_SURE_DELETE']['EN']} "${title}"?`;
		}
	}

	getUiTranslate(text: string): string {
		const key = text.toUpperCase();
		if (this.isRuLang()) {
			return UI_TRANSLATION[key]['RU'];
		} else {
			return UI_TRANSLATION[key]['EN'];
		}
	}

	private isRuLang(): boolean {
		return this.localStorageService.get('lang') === 'ru';
	}
}
