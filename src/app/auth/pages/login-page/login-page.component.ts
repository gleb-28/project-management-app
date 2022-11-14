import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { login } from 'src/app/store/actions/user.actions';
import { CustomValidator } from '../../validator';


@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {

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
	}
		,
	);

	public login() {
		if (this.loginForm.valid) {
			this.store.dispatch(login({ request: this.loginForm.value }));
		}
	}


	public isValid(type:string, error: string ) {
		return this.loginForm.controls[type].errors?.[error] && this.loginForm.controls[type].touched;
	}

}
