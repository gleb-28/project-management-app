import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { deleteUserPending, editUserPending } from 'src/app/store/actions/user.actions';
import { User } from 'src/app/store/models/user.state';
import { selectUser } from 'src/app/store/selectors/user.selectors';
import { CustomValidator } from '../../validator';

@Component({
	selector: 'app-user-settings-page',
	templateUrl: './user-settings-page.component.html',
	styleUrls: ['./user-settings-page.component.scss'],
})
export class UserSettingsPageComponent implements OnInit {
	user!: User;

	public updateForm!: FormGroup;

	constructor(private store: Store) { }

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


	public onSubmit() {
		if (this.updateForm.valid) {
			this.store.dispatch(editUserPending({ request: this.updateForm.value }));
		}
	}

	public deleteUser() {
		this.store.dispatch(deleteUserPending());
	}

	public isValid(type:string, error: string ) {
		return this.updateForm.controls[type].errors?.[error] && this.updateForm.controls[type].touched;
	}
}
