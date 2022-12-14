import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from '@app/auth/validator';
import { login } from '@app/store/actions/user-action/user.action';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-sign-in-page',
	templateUrl: './sign-in-page.component.html',
	styleUrls: ['./sign-in-page.component.scss'],
})
export class SignInPageComponent {
	constructor(private store: Store) {}

	public loginForm: FormGroup = new FormGroup({
		login: new FormControl('', [Validators.required, Validators.minLength(3)]),
		password: new FormControl('', [
			Validators.required,
			Validators.minLength(8),
			CustomValidator.hasRegister,
			CustomValidator.hasNumber,
			CustomValidator.hasSymbol,
		]),
	});

	public login(): void {
		if (this.loginForm.valid) {
			this.store.dispatch(login({ request: this.loginForm.value }));
		}
	}

	public isValid(type: string, error: string): boolean {
		return this.loginForm.controls[type].errors?.[error] && this.loginForm.controls[type].touched;
	}
}
