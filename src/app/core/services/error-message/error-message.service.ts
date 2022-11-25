import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { ERROR_MESSAGES_EN, ERROR_MESSAGES_RU } from '../../../constants/constants';

@Injectable({
	providedIn: 'root',
})
export class ErrorMessageService {
	constructor(private localStorageService: LocalStorageService) {}

	getError(key: number | string) {
		if (this.localStorageService.get('lang') === 'ru') {
			return ERROR_MESSAGES_RU[key] || ERROR_MESSAGES_RU[400];
		} else {
			return ERROR_MESSAGES_EN[key] || ERROR_MESSAGES_EN[400];
		}
	}
}
