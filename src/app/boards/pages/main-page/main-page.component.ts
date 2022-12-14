import { Component, OnInit, OnDestroy } from '@angular/core';
import { getUserBoards } from '@app/store/actions/boards-action/boards.action';
import { selectBoards } from '@app/store/selectors/boards-selector/boards.selector';
import { selectUserId } from '@app/store/selectors/user-selector/user.selector';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-main',
	templateUrl: './main-page.component.html',
	styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, OnDestroy {
	public boards$ = this.store.select(selectBoards);
	public userIdSubscription!: Subscription;

	public boardsFilter = '';

	constructor(private store: Store) {}

	public ngOnInit(): void {
		this.userIdSubscription = this.store
			.select(selectUserId)
			.subscribe((userId) => this.store.dispatch(getUserBoards({ userId })));
	}

	public ngOnDestroy(): void {
		this.userIdSubscription.unsubscribe();
	}
}
