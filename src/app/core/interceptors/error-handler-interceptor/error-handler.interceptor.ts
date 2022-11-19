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
import { ErrorFriendyMessage } from 'src/app/constants/error-response.enum';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

	constructor(public errorDataService: ErrorDataService) {}

	public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		return next.handle(request)
			.pipe(
				retry(1),
				catchError((error: HttpErrorResponse) => {
					let errorMessage = '';
					if (error.error instanceof ErrorEvent) {
						// client-side error
						errorMessage = `Search, what means '${error.error.message}'`;
						this.errorDataService.sendData(errorMessage);
					} else {
						// server-side error
						switch (error.status) {
							case 400:
								errorMessage = ErrorFriendyMessage.BAD_REQUEST;
								break;
							case 401:
								errorMessage = ErrorFriendyMessage.AUTHORIZATION_ERROR;
								break;
							case 402:
								errorMessage = ErrorFriendyMessage.FILE_ALREADY_EXIST;
								break;
							case 403:
								errorMessage = ErrorFriendyMessage.FORBIDDEN;
								break;
							case 404:
								errorMessage = ErrorFriendyMessage.WAS_NOT_FOUNDED;
								break;
							case 409:
								errorMessage = ErrorFriendyMessage.LOGIN_ALREADY_EXIST;
								break;
						
							default:
								errorMessage = 'Something went wrong...';
								break;
						}
						this.errorDataService.sendData(errorMessage);
					}
				
					return throwError(errorMessage);
				}),
			);
	}
}
