import { AbstractControl } from '@angular/forms';

export class ValidatorPassDate {
	static ofRegister(control: AbstractControl): { [key: string]: boolean } | null {
		const regExp = /(?=.*[a-z])(?=.*[A-Z])/;
		if (!regExp.test(control.value)) {
			return { isValidRegister: true };
		}
		return null;
	}

	static ofNumber(control: AbstractControl): { [key: string]: boolean } | null {
		const regExp = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;
		if (!regExp.test(control.value)) {
			return { isValidNumber: true };
		}
		return null;
	}

	static ofSymbol(control: AbstractControl): { [key: string]: boolean } | null {
		const regExp = /(?=.*[$@$!%*?&])/;
		if (!regExp.test(control.value)) {
			return { isValidSymbol: true };
		}
		return null;
	}

	static ofDate(control: AbstractControl): { [key: string]: boolean } | null {
		const enteredDate = +new Date(control.value);
		if (Date.now() < enteredDate) {
			return { isValidDate: true };
		}
		return null;
	}
}
