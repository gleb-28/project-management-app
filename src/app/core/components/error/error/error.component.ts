import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ErrorDataService } from 'src/app/core/services/error-data.service';

@Component({
	selector: 'app-error',
	templateUrl: './error.component.html',
	styleUrls: ['./error.component.scss'],
	providers: [MessageService],
})
export class ErrorComponent implements OnInit {
	private error!: string;
	private subscription!: Subscription; 

	constructor(private messageService: MessageService,
		private errorDataService: ErrorDataService) { 
	}

	public ngOnInit():void {
		this.subscription = this.errorDataService.error.subscribe(response => {
			this.error = response;
			this.showError();
		});
	}

	private showError():void {
		this.messageService.add({ severity: 'error', detail: this.error });
	}
}
