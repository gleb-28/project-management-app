import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPassDate } from '../../validator';

@Component({
	selector: 'app-sign-up-page',
	templateUrl: './sign-up-page.component.html',
	styleUrls: ['./sign-up-page.component.scss'],
})
export class SignUpPageComponent {

	signUpForm: FormGroup = new FormGroup({
		name: new FormControl('', [Validators.required, Validators.minLength(3)]),
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

	signUp() {}

	isRequired(type: string) {
		const { invalid, touched, errors, dirty } = this.signUpForm.controls[type];
		return invalid && (touched || dirty) && errors?.['required'];
	}

	get isPasswordStrong() {
		const { touched, errors, dirty } = this.signUpForm.controls['password'];
		return (touched || dirty) && errors?.['pattern'];
	}

	isTouched(type: string) {
		return this.signUpForm.controls[type].touched;
	}

	isValid(error: string, type:string = 'password') {
		return this.signUpForm.controls[type].errors?.[error];
	}


}
