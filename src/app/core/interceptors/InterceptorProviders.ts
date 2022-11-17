import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiBaseUrlInterceptor } from './api-base-url-interceptor/api-base-url.interceptor';
import { ErrorHandlerInterceptor } from './error-handler-interceptor/error-handler.interceptor';
import { TokenInterceptor } from './token-interceptor/token.interceptor';

export const InterceptorProviders = [
	{ provide: HTTP_INTERCEPTORS, useClass: ApiBaseUrlInterceptor, multi: true },
	{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
	{ provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true },
];
