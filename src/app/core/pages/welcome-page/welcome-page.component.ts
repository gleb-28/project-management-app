import { Component } from '@angular/core';
import { TEAM } from 'src/app/constants/constants';

@Component({
	selector: 'app-welcome-page',
	templateUrl: './welcome-page.component.html',
	styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent {
	public team = TEAM;
}
