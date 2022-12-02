import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '@app/core/services/local-storage/local-storage.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	constructor(private localStorageService: LocalStorageService) {}

	public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		if (!request.url.includes('auth/signin') || !request.url.includes('auth/signup')) {
			const token = this.localStorageService.get('token');

			request = request.clone({
				setHeaders: { Authorization: `Bearer ${token}` },
			});

			return next.handle(request);
		}

		return next.handle(request);
	}
}
