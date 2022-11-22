import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiBaseUrlInterceptor } from './api-base-url-interceptor/api-base-url.interceptor';
import { LoadingInterceptor } from './loading-interceptor/loading.interceptor';
import { TokenInterceptor } from './token-interceptor/token.interceptor';

export const InterceptorProviders = [
	{ provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
	{ provide: HTTP_INTERCEPTORS, useClass: ApiBaseUrlInterceptor, multi: true },
	{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
];
