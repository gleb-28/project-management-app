import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { HandleErrorResponseService } from '../../services/handle-error-response.service';
import { ErrorMessageService } from '../../services/error-message/error-message.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
	constructor(private errorService: HandleErrorResponseService, private errorMessageService: ErrorMessageService) {}

	public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(
			tap({
				next: () => null,
				error: (error: HttpErrorResponse) => {
					this.errorService.sendData(this.errorMessageService.getError(error.status));
				},
			}),
		);
	}
}
