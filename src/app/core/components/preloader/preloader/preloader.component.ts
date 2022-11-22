import { Component } from '@angular/core';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
	selector: 'app-preloader',
	templateUrl: './preloader.component.html',
	styleUrls: ['./preloader.component.scss'],
})
export class PreloaderComponent {
	public isLoading$ = this.loader.isLoading$.asObservable();

	constructor(public loader: LoaderService) {}
}
