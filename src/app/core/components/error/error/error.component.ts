import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ErrorDataService } from 'src/app/core/services/error-data.service';
import { ErrorResponse } from 'src/app/models/error.model';

@Component({
	selector: 'app-error',
	templateUrl: './error.component.html',
	styleUrls: ['./error.component.scss'],
	providers: [MessageService],
})
export class ErrorComponent implements OnInit {
	private error!: ErrorResponse;
	private subscription!: Subscription; 

	constructor(private messageService: MessageService,
		private errorDataService: ErrorDataService) { 
	}

	public ngOnInit():void {
		this.subscription = this.errorDataService.data.subscribe(response => {
			try {
				this.error = JSON.parse(response);
				this.showError();
			} catch (error) {}
		});
	}

	private showError():void {
		this.messageService.add({ severity: 'error', summary: `${this.error.statusCode}`, detail: this.error.message });
	}
}
