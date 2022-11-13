import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../../services/local-storage.service';
import { SignInResponse } from 'src/app/models/auth.model';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	constructor(private localStorageService: LocalStorageService) {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		if (!request.url.includes('auth/signin') || !request.url.includes('auth/signup')) {
			const token: SignInResponse | null = this.localStorageService.get('token');

			request = request.clone({
				setHeaders: { Authorization: `Bearer ${token?.token}` },
			});

			return next.handle(request);
		}

		return next.handle(request);
	}
}
