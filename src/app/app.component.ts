import { Component, OnInit } from '@angular/core';
import { SocketioService } from './boards/services/socketio/socketio.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	constructor(private socketService: SocketioService) { }

	ngOnInit(): void {
		this.socketService.setupSocketConnection();
	}
}
