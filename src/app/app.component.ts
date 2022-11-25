import { Component, OnInit } from '@angular/core';
import { SocketService } from './boards/services/socketio/socket.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	constructor(private socketService: SocketService) {}

	ngOnInit(): void {
		this.socketService.setupSocketConnection();
	}
}
