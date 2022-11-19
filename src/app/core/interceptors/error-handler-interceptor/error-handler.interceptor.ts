import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { ErrorDataService } from '../../services/error-data.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

	constructor(public errorDataService: ErrorDataService) {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		return next.handle(request)
			.pipe(
				retry(1),
				catchError((error: HttpErrorResponse) => {
					let errorMessage = '';
					errorMessage = JSON.stringify(error.error);
					this.errorDataService.sendData(errorMessage);
					return throwError(errorMessage);
				}),
			);
	}
}
