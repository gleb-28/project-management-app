import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from '../../validator';

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
			CustomValidator.hasRegister,
			CustomValidator.hasNumber,
			CustomValidator.hasSymbol,
		]),
	});

	// constructor(private fb: FormBuilder) {}
	// signUpForm: FormGroup = this.fb.group({
	//   name: ['', [Validators.required, Validators.minLength(3)]],
	//   basicInfo: this.fb.group({
	//     login: ['', [Validators.required, Validators.minLength(3)]],
	// 	  password:['', [
	// 		Validators.required,
	// 		Validators.minLength(8),
	//     CustomValidator.hasRegister,
	// 		CustomValidator.hasNumber,
	// 		CustomValidator.hasSymbol,
	// 	]],
	//   },
	//   )}

	// );

	public signUp() {}

	isValid(type:string, error: string ) {
		return this.signUpForm.controls[type].errors?.[error] && this.signUpForm.controls[type].touched;
	}


}
