import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
	selector: 'app-error',
	templateUrl: './error.component.html',
	styleUrls: ['./error.component.scss'],
})
export class ErrorComponent {
	public error!: string;

	constructor(private messageService: MessageService) { 
	}

	public addSingle():void {
		this.messageService.add({ severity: 'error', summary: 'Error', detail: this.error });
	}

	public clear(): void {
		this.messageService.clear();
	}
}
