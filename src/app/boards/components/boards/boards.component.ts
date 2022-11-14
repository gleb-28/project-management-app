import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-boards',
	templateUrl: './boards.component.html',
	styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent {
	@Input() boardTitle = '';

	@Input() boardUsers: Array<string> = [];

}
