import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { HandleErrorResponseService } from 'src/app/core/services/handle-error-response.service';

@Component({
	selector: 'app-error-toast',
	templateUrl: './error-toast.component.html',
	styleUrls: ['./error-toast.component.scss'],
	providers: [MessageService],
})
export class ErrorToastComponent implements OnInit {
	constructor(private messageService: MessageService, private handleErrorResponseService: HandleErrorResponseService) {}

	public ngOnInit(): void {
		this.handleErrorResponseService.error.asObservable().subscribe((error) => {
			console.log(error);
			this.showError(error);
		});
	}

	private showError(error: string): void {
		this.messageService.add({ severity: 'error', detail: error });
	}
}
