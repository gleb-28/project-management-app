import { Component } from '@angular/core';
import { team } from 'src/app/constants/team.constant';

@Component({
	selector: 'app-welcome-page',
	templateUrl: './welcome-page.component.html',
	styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent {
	public team = team;
}
