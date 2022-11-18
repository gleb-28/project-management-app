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
	public error!: string;
	public  subscription!: Subscription; 

	constructor(private messageService: MessageService,
		public errorDataService: ErrorDataService) { 
	}

	public ngOnInit():void {
		this.subscription = this.errorDataService.data.subscribe(response => {
			this.error = response;
			this.showError();
		});
	}

	showError() {
		this.messageService.add({ severity: 'error', summary: 'Error', detail: this.error });
	}
}
