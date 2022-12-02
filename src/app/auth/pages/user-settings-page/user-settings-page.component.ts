import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from '@app/auth/validator';
import { editUser, deleteUser } from '@app/store/actions/user-action/user.action';
import { User } from '@app/store/models/user.state';
import { selectUser } from '@app/store/selectors/user-selector/user.selector';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-user-settings-page',
	templateUrl: './user-settings-page.component.html',
	styleUrls: ['./user-settings-page.component.scss'],
})
export class UserSettingsPageComponent implements OnInit {
	public user!: User;

	public updateForm!: FormGroup;

	constructor(private store: Store) {}

	public ngOnInit(): void {
		this.store.select(selectUser).subscribe((userData) => (this.user = userData));
		this.updateForm = new FormGroup({
			name: new FormControl(this.user.name, [Validators.required, Validators.minLength(3)]),
			login: new FormControl(this.user.login, [Validators.required, Validators.minLength(3)]),
			password: new FormControl('', [
				Validators.required,
				Validators.minLength(8),
				CustomValidator.hasRegister,
				CustomValidator.hasNumber,
				CustomValidator.hasSymbol,
			]),
		});
	}

	public onSubmit():void {
		if (this.updateForm.valid) {
			this.store.dispatch(editUser({ request: this.updateForm.value }));
		}
	}

	public deleteUser(): void {
		this.store.dispatch(deleteUser());
	}

	public isValid(type: string, error: string): boolean {
		return this.updateForm.controls[type].errors?.[error] && this.updateForm.controls[type].touched;
	}
}
