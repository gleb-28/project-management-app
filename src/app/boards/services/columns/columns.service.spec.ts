import { TestBed } from '@angular/core/testing';

import { ColumnsService } from './columns.service';

describe('BoardService', () => {
	let service: ColumnsService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(ColumnsService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
