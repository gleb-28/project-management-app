import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { HandleErrorResponseService } from '@app/core/services/handle-error-response/handle-error-response.service';
import { ErrorMessageService } from '@app/core/services/error-message/error-message.service';
import { Store } from '@ngrx/store';
import { logout } from '@app/store/actions/user-action/user.action';
import { Router } from '@angular/router';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
	constructor(private errorService: HandleErrorResponseService, private errorMessageService: ErrorMessageService, private store: Store, private router: Router) {}

	public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(
			tap({
				next: () => null,
				error: (error: HttpErrorResponse) => {
					if (error.status === 403) {
						this.store.dispatch(logout());
						this.router.navigateByUrl('/welcome');
					}
					this.errorService.sendData(this.errorMessageService.getError(error.status));
				},
			}),
		);
	}
}
