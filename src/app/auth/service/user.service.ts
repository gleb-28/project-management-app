import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignInRequest, SignUpResponse } from 'src/app/models/auth.model';
import { UserId } from 'src/app/models/ids.model';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	constructor(private http: HttpClient) {}

	public getUsers(): Observable<SignUpResponse[]> {
		return this.http.get<SignUpResponse[]>('/users');
	}

	public getUser(id: UserId): Observable<SignUpResponse> {
		return this.http.get<SignUpResponse>(`/users/${id}`);
	}

	public deleteUser(id: UserId): Observable<SignUpResponse> {
		return this.http.delete<SignUpResponse>(`/users/${id}`);
	}

	public updateUser(id: UserId, userData: SignInRequest): Observable<SignUpResponse> {
		return this.http.put<SignUpResponse>(`/users/${id}`, userData);
	}
}
