import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ERROR_MESSAGE } from '@app/constants/constants';
import { HandleErrorResponseService } from '@app/core/services/handle-error-response.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
	constructor(private errorService: HandleErrorResponseService) {}

	public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(
			tap({
				next: () => null,
				error: (error: HttpErrorResponse) => {
					this.errorService.sendData(ERROR_MESSAGE[error.status] || ERROR_MESSAGE[400]);
				},
			}),
		);
	}
}
