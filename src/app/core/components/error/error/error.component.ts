import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { HandleErrorResponseService } from 'src/app/core/services/handle-error-response.service';

@Component({
	selector: 'app-error',
	templateUrl: './error.component.html',
	styleUrls: ['./error.component.scss'],
	providers: [MessageService],
})
export class ErrorComponent implements OnInit {
	private errorMessage!: string;
	private subscription!: Subscription; 

	constructor(private messageService: MessageService,
		private handleErrorResponseService: HandleErrorResponseService) { 
	}

	public ngOnInit():void {
		this.subscription = this.handleErrorResponseService.error.subscribe(response => {
			this.errorMessage = response;
			this.showError();
		});
	}

	private showError():void {
		this.messageService.add({ severity: 'error', detail: this.errorMessage });
	}
}
