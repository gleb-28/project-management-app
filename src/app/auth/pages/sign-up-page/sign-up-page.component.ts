import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { signUpPending } from 'src/app/store/actions/user.actions';
import { CustomValidator } from '../../validator';

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
			this.store.dispatch(signUpPending({ request: this.signUpForm.value }));
		}
	}

	public isValid(type:string, error: string ) {
		return this.signUpForm.controls[type].errors?.[error] && this.signUpForm.controls[type].touched;
	}


}
