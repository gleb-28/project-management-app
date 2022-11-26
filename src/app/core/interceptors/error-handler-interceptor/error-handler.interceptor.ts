import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { HandleErrorResponseService } from '@app/core/services/handle-error-response/handle-error-response.service';
import { Store } from '@ngrx/store';
import { logout } from '@app/store/actions/user-action/user.action';
import { Router } from '@angular/router';
import { TranslateUiService } from '@app/core/services/translate-ui/translate-ui.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

	constructor(
		private errorService: HandleErrorResponseService,
		private store: Store,
		private router: Router,
		private translateUiService: TranslateUiService,
	) {}

	public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(
			tap({
				next: () => null,
				error: (error: HttpErrorResponse) => {
					if (error.status === 403) {
						this.store.dispatch(logout());
						this.router.navigateByUrl('/welcome');
					}
					this.errorService.sendData(this.translateUiService.getError(error.status));
				},
			}),
		);
	}
}
