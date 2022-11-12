import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take, tap } from 'rxjs';
import { editUserPending } from 'src/app/store/actions/user.actions';
import { selectIsUser } from 'src/app/store/selectors/user.selectors';
import { CustomValidator } from '../../validator';

@Component({
	selector: 'app-user-settings-page',
	templateUrl: './user-settings-page.component.html',
	styleUrls: ['./user-settings-page.component.scss'],
})
export class UserSettingsPageComponent implements OnInit {
	name!: string;

	login!: string;

	public updateForm!: FormGroup;

	constructor(private store: Store) { }

	public ngOnInit(): void {
		this.store.select(selectIsUser).pipe(
			take(1),
			tap((user) => {
				if (user) {
					const { name, login } = user;
					this.name = name;
					this.login = login;
				}

			}));
		this.updateForm = new FormGroup({
			name: new FormControl(this.name, [Validators.required, Validators.minLength(3)]),
			login: new FormControl(this.login, [Validators.required, Validators.minLength(3)]),
			password: new FormControl('', [
				Validators.required,
				Validators.minLength(8),
				CustomValidator.hasRegister,
				CustomValidator.hasNumber,
				CustomValidator.hasSymbol,
			]),
		});
	}


	public save() {
		if (this.updateForm.valid) {
			this.store.dispatch(editUserPending({ request: this.updateForm.value }));
		}
	}


	public isValid(type:string, error: string ) {
		return this.updateForm.controls[type].errors?.[error] && this.updateForm.controls[type].touched;
	}
}
