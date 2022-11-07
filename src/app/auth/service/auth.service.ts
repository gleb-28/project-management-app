import { Injectable } from '@angular/core';
import { SignInRequest, SignInResponse, SignUpRequest, SignUpResponse } from 'src/app/models/auth.models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';


// remove after add interceptor
const httpOptions = {
	headers: new HttpHeaders({
		'accept': 'application/json',
		'Content-Type': 'application/json',
	}),
};


@Injectable({
	providedIn: 'root',
})


export class AuthService {

	private _tokenLifeTime: number = 24;

	constructor(private http: HttpClient, private storage: LocalStorageService) { }

	public signUp(user: SignUpRequest): Observable<SignUpResponse> {
		return this.http.post<SignUpResponse>(`${environment.API_BASE_URL}/auth/signup`, user, httpOptions);

	}

	public login(userData: SignInRequest): Observable<SignInResponse> {
		return this.http.post<SignInResponse>(`${environment.API_BASE_URL}/auth/signin`, userData, httpOptions);
	}

	public checkToken(tokenCreateDate: string): void {
		const dateNow = Date.now();
		const tokenDate = new Date(tokenCreateDate);
		const tokenAge = (dateNow - tokenDate.getTime());

		if (tokenAge > this._tokenLifeTime) {
			this.logout();
		}
	}

	logout() {
		this.storage.remove('user');
		//this.router.navigateByUrl('/welcom')
	}


}
