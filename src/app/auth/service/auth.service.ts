import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '@app/core/services/local-storage.service';
import { SignUpRequest, SignUpResponse, SignInRequest, SignInResponse } from '@app/models/auth.model';
import { Observable } from 'rxjs';


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

	// get idea from  https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript-without-using-a-library
	getIdFromToken(): string  {
		const token: string | null = this.LocalStorage.get('token');
		if (token) {
			let base64Url = token.split('.')[1];
			let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
			let jsonPayload: DecoderToken = JSON.parse(decodeURIComponent(window.atob(base64).split('').map(function (c) {
				return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
			}).join('')));

			return jsonPayload.id;
		}
		return '';
	}
}
