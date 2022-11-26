import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { HandleErrorResponseService } from '@app/core/services/handle-error-response.service';
import { TranslateUiService } from '@app/core/services/error-message/translate-ui.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
	constructor(private errorService: HandleErrorResponseService, private errorMessageService: TranslateUiService) {}

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
