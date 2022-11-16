import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectBoards } from '../../../store/selectors/boards-selector/boards.selector';

@Component({
	selector: 'app-main',
	templateUrl: './main-page.component.html',
	styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
	boards$ = this.store.select(selectBoards);

	constructor(private store: Store) {}
}
