import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
	selector: 'app-error',
	templateUrl: './error.component.html',
	styleUrls: ['./error.component.scss'],
	providers: [MessageService],
})
export class ErrorComponent implements OnInit {
	public error!: string;

	constructor(private messageService: MessageService) { 
	}

	public ngOnInit():void {
		this.showError();
	}

	showError() {
		this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Message Content' });
	}

}
