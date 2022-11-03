import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPassDate } from '../../validator';


@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
	loginForm: FormGroup = new FormGroup({
		login: new FormControl('', [Validators.required, Validators.minLength(3)]),
		password: new FormControl('', [
			Validators.required,
			Validators.minLength(8),
			Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}/),
			ValidatorPassDate.ofRegister,
			ValidatorPassDate.ofNumber,
			ValidatorPassDate.ofSymbol,
		]),
	});

	login() {}

	isRequired(type: string) {
		const { invalid, touched, errors, dirty } = this.loginForm.controls[type];
		return invalid && (touched || dirty) && errors?.['required'];
	}

	get isPasswordStrong() {
		const { touched, errors, dirty } = this.loginForm.controls['password'];
		return (touched || dirty) && errors?.['pattern'];
	}

	isTouched(type: string) {
		return this.loginForm.controls[type].touched;
	}

	isValid(error: string, type:string = 'password') {
		return this.loginForm.controls[type].errors?.[error];
	}

}
