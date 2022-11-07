import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from '../../validator';

@Component({
	selector: 'app-user-settings-page',
	templateUrl: './user-settings-page.component.html',
	styleUrls: ['./user-settings-page.component.scss'],
})
export class UserSettingsPageComponent  {
	updateForm: FormGroup = new FormGroup({
		name: new FormControl('nadya', [Validators.required, Validators.minLength(3)]),
		login: new FormControl('nadya@mail.ru', [Validators.required, Validators.minLength(3)]),
		password: new FormControl('45381FDVhyh?', [
			Validators.required,
			Validators.minLength(8),
			CustomValidator.hasRegister,
			CustomValidator.hasNumber,
			CustomValidator.hasSymbol,
		]),
	});

	public save() {
		if (this.updateForm.valid) {}
	}


	public isValid(type:string, error: string ) {
		return this.updateForm.controls[type].errors?.[error] && this.updateForm.controls[type].touched;
	}
}
