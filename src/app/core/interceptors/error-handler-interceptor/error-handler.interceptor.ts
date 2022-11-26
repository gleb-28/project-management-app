import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { HandleErrorResponseService } from '@app/core/services/handle-error-response.service';
import { ErrorMessageService } from '@app/core/services/error-message/error-message.service';
import { Router } from '@angular/router';
import { ValidTokenService } from '@app/core/services/valid-token.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
	constructor(private errorService: HandleErrorResponseService, private errorMessageService: ErrorMessageService, private router: Router, private validTokenService: ValidTokenService) {}

	public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(
			tap({
				next: () => null,
				error: (error: HttpErrorResponse) => {
					if (error.status === 403) {
						this.validTokenService.validToken.next(error.status);
						this.router.navigateByUrl('/welcome');
					}
					this.errorService.sendData(this.errorMessageService.getError(error.status));
				},
			}),
		);
	}
}
