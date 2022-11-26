import { TestBed } from '@angular/core/testing';

import { HandleErrorResponseService } from './handle-error-response.service';

describe('ErrorDataService', () => {
	let service: HandleErrorResponseService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(HandleErrorResponseService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
