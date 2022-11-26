import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { ERROR_MESSAGES_EN, ERROR_MESSAGES_RU } from '../../../constants/constants';

@Injectable({
	providedIn: 'root',
})
export class ErrorMessageService {
	constructor(private localStorageService: LocalStorageService) {}


	isLang():boolean {
		return this.localStorageService.get('lang') === 'ru';
	}

	getError(key: number | string) {
		if (this.isLang()) {
			return ERROR_MESSAGES_RU[key] || ERROR_MESSAGES_RU[400];
		} else {
			return ERROR_MESSAGES_EN[key] || ERROR_MESSAGES_EN[400];
		}
	}

	getConfirmMessage(title: string): string {
		if (this.isLang()) {
			return `Вы уверены, что хотите удалить"${title}" ?`;
		} else {
			return `Are you sure that you want to delete "${title}" ?`;
		}
	}

	getSplitButton(button: string): string {
		if (this.isLang()) {
			switch (button) {
				case 'Rename':
					return 'Переименовать';
					break;
				case 'Members':
					return 'Участники';
					break;
				case 'Delete':
					return 'Удалить';
					break;
				default:
					return button;
			}
		} else {
			return button;
		}
	}
}
