import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { login } from 'src/app/store/actions/user-action/user.action';
import { CustomValidator } from '../../validator';

@Component({
	selector: 'app-sign-in-page',
	templateUrl: './sign-in-page.component.html',
	styleUrls: ['./sign-in-page.component.scss'],
})
export class SignInPageComponent {
	constructor(private store: Store) {}

	loginForm: FormGroup = new FormGroup({
		login: new FormControl('', [Validators.required, Validators.minLength(3)]),
		password: new FormControl('', [
			Validators.required,
			Validators.minLength(8),
			CustomValidator.hasRegister,
			CustomValidator.hasNumber,
			CustomValidator.hasSymbol,
		]),
	});

	public login() {
		if (this.loginForm.valid) {
			this.store.dispatch(login({ request: this.loginForm.value }));
		}
	}

	public isValid(type: string, error: string) {
		return this.loginForm.controls[type].errors?.[error] && this.loginForm.controls[type].touched;
	}
}
