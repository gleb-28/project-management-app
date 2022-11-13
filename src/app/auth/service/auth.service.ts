import { Injectable } from '@angular/core';
import { SignInRequest, SignInResponse, SignUpRequest, SignUpResponse } from 'src/app/models/auth.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';


interface DecoderToken {
	id: string,
	login: string,
	iat: number,
	exp: number
}

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(private http: HttpClient, private LocalStorage: LocalStorageService) {}


	public signUp(userData: SignUpRequest): Observable<SignUpResponse> {
		return this.http.post<SignUpResponse>('/auth/signup', userData);
	}

	public login(userData: SignInRequest): Observable<SignInResponse> {
		return this.http.post<SignInResponse>('/auth/signin', userData);
	}

	logout() {
		this.LocalStorage.remove('token');
		//this.router.navigateByUrl('/welcom')
	}


	// get idea from  https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript-without-using-a-library
	getIdFromToken(): string  {
		const res: SignInResponse | null = this.LocalStorage.get('token');
		if (res) {
			let base64Url = res.token.split('.')[1];
			let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
			let jsonPayload: DecoderToken = JSON.parse(decodeURIComponent(window.atob(base64).split('').map(function (c) {
				return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
			}).join('')));

			return jsonPayload.id;
		}
		return '';
	}
}
