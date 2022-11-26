import { TestBed } from '@angular/core/testing';

import { TranslateUiService } from './translate-ui.service';

describe('ErrorMessageService', () => {
	let service: TranslateUiService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(TranslateUiService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
