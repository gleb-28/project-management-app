import { Injectable } from '@angular/core';
import { SignInRequest, SignInResponse, SignUpRequest, SignUpResponse } from 'src/app/models/auth.models';
import { HttpClient } from '@angular/common/http';
import {  Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';


@Injectable({
	providedIn: 'root',
})


export class AuthService {


	constructor(private http: HttpClient, private LocalStorage: LocalStorageService) { }

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


}
