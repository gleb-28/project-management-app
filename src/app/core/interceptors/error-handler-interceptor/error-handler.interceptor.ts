import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpErrorResponse,
	HttpResponse,
} from '@angular/common/http';
import { catchError, filter, Observable, throwError } from 'rxjs';
import { HandleErrorResponseService } from '../../services/handle-error-response.service';
import { ErrorFriendyMessage } from 'src/app/constants/error-response.enum';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

	constructor(private service: HandleErrorResponseService) {}

	public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(request)
			.pipe(
				filter(event => event instanceof HttpResponse),
				// retry(1),
				catchError((error: HttpErrorResponse) => {
					let errorMessage = '';
					if (error.error instanceof ErrorEvent) {
						// client-side error
						errorMessage = `Search, what means '${error.error.message}'`;
						this.service.sendData(errorMessage);
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
								errorMessage = 'Something went wrong...Check the console';
								break;
						}
						this.service.sendData(errorMessage);
					}
				
					return throwError(errorMessage);
				}),
			);
	}
}
