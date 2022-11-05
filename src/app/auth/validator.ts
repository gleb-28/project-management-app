import { AbstractControl } from '@angular/forms';

export class CustomValidator {
	static hasRegister(control: AbstractControl): { [key: string]: boolean } | null {
		const regExp = /(?=.*[a-z])(?=.*[A-Z])/;
		if (!regExp.test(control.value)) {
			return { isValidRegister: true };
		}
		return null;
	}

	static hasNumber(control: AbstractControl): { [key: string]: boolean } | null {
		const regExp = /(?=.*[0-9])/;
		if (!regExp.test(control.value)) {
			return { isValidNumber: true };
		}
		return null;
	}

	static hasSymbol(control: AbstractControl): { [key: string]: boolean } | null {
		const regExp = /\W+/;
		if (!regExp.test(control.value)) {
			return { isValidSymbol: true };
		}
		return null;
	}
}
