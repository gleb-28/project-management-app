import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignInRequest, SignUpResponse } from 'src/app/models/auth.models';
import { environment } from 'src/environments/environment';


// remove after add interceptor
function getToken() {
	const storedValue = localStorage.getItem('user');
	return storedValue ? JSON.parse(storedValue) : '';
}
// remove after add interceptor
const httpOptions = {
	headers: new HttpHeaders({
		'accept': 'application/json',
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${getToken()}`,
	}),
};

@Injectable({
	providedIn: 'root',
})
export class UserService {

	constructor(private http: HttpClient) { }

	public getUsers(): Observable<SignUpResponse[]> {
		return this.http.post<SignUpResponse[]>(`${environment.API_BASE_URL}/users`, httpOptions);
	}

	public getUser(id: string): Observable<SignUpResponse> {
		return this.http.post<SignUpResponse>(`${environment.API_BASE_URL}/users/${id}`, httpOptions);
	}

	public deleteUser(id: string): Observable<SignUpResponse> {
		return this.http.delete<SignUpResponse>(`${environment.API_BASE_URL}/users/${id}`, httpOptions);
	}

	public updateUser(id: string, userData: SignInRequest): Observable<SignUpResponse> {
		return this.http.put<SignUpResponse>(`${environment.API_BASE_URL}/users/${id}`, userData, httpOptions);
	}
}
