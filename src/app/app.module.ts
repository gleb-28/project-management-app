import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { BoardsModule } from './boards/boards.module';
import { InterceptorProviders } from './core/interceptors/InterceptorProviders';
import UserEffect from './store/effects/user-effect/user.effect';
import { userReducer } from './store/reducers/user-reducer/user.reducer';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


export function translateHttpLoaderFactory(httpBackend: HttpBackend): TranslateHttpLoader {
	return new TranslateHttpLoader(new HttpClient(httpBackend));
}


@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		CoreModule,
		AuthModule,
		BoardsModule,
		StoreModule.forFeature('user', userReducer),
		StoreModule.forRoot({}),
		EffectsModule.forRoot([UserEffect]),
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			logOnly: environment.production,
		}),
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				deps: [HttpBackend],
				useFactory: translateHttpLoaderFactory,
			},
		}),
	],
	providers: [InterceptorProviders],
	bootstrap: [AppComponent],
})
export class AppModule {}
