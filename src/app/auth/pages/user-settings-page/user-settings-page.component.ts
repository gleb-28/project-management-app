import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorPassDate } from '../../validator';

@Component({
	selector: 'app-user-settings-page',
	templateUrl: './user-settings-page.component.html',
	styleUrls: ['./user-settings-page.component.scss'],
})
export class UserSettingsPageComponent  {
	updateForm: FormGroup = new FormGroup({
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

	update() {}

	isRequired(type: string) {
		const { invalid, touched, errors, dirty } = this.updateForm.controls[type];
		return invalid && (touched || dirty) && errors?.['required'];
	}

	isTouched(type: string) {
		return this.updateForm.controls[type].touched;
	}

	isValid(error: string, type:string = 'password') {
		return this.updateForm.controls[type].errors?.[error];
	}

	get isPasswordStrong() {
		const { touched, errors, dirty } = this.updateForm.controls['password'];
		return (touched || dirty) && errors?.['pattern'];
	}


}
