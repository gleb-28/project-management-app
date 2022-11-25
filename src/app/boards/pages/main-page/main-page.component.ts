import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectBoards } from '../../../store/selectors/boards-selector/boards.selector';
import { getUserBoards } from '../../../store/actions/boards-action/boards.action';
import { selectUserId } from '../../../store/selectors/user-selector/user.selector';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-main',
	templateUrl: './main-page.component.html',
	styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, OnDestroy {
	boards$ = this.store.select(selectBoards);
	userIdSubscription!: Subscription;

	boardsFilter = '';

	constructor(private store: Store) {}

	ngOnInit(): void {
		this.userIdSubscription = this.store
			.select(selectUserId)
			.subscribe((userId) => this.store.dispatch(getUserBoards({ userId })));
	}

	ngOnDestroy(): void {
		this.userIdSubscription.unsubscribe();
	}
}
