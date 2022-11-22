import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { catchError, EMPTY, Observable } from 'rxjs';
import { HandleErrorResponseService } from '../../services/handle-error-response.service';
import { ERROR_MESSAGE } from '../../../constants/constants';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
	constructor(private errorService: HandleErrorResponseService) {}

	public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(
			catchError((error: HttpErrorResponse) => {
				this.errorService.sendData(ERROR_MESSAGE[error.status] || ERROR_MESSAGE[400]);

				return EMPTY;
			}),
		);
	}
}
