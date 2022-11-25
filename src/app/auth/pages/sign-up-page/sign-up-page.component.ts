import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from '@app/auth/validator';
import { signUp } from '@app/store/actions/user-action/user.action';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-sign-up-page',
	templateUrl: './sign-up-page.component.html',
	styleUrls: ['./sign-up-page.component.scss'],
})
export class SignUpPageComponent {
	constructor(private store: Store) {}

	signUpForm: FormGroup = new FormGroup({
		name: new FormControl('', [Validators.required, Validators.minLength(3)]),
		login: new FormControl('', [Validators.required, Validators.minLength(3)]),
		password: new FormControl('', [
			Validators.required,
			Validators.minLength(8),
			CustomValidator.hasRegister,
			CustomValidator.hasNumber,
			CustomValidator.hasSymbol,
		]),
	});

	public onSubmit() {
		if (this.signUpForm.valid) {
			this.store.dispatch(signUp({ request: this.signUpForm.value }));
		}
	}

	public isValid(type: string, error: string) {
		return this.signUpForm.controls[type].errors?.[error] && this.signUpForm.controls[type].touched;
	}
}
