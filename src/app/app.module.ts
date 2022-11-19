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
import { InterceptorProviders } from './core/interceptors/InterceptorProviders';
import UserEffect from './store/effects/user-effect/user.effect';
import { userReducer } from './store/reducers/user-reducer/user.reducer';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		CoreModule,
		AuthModule,
		StoreModule.forFeature('user', userReducer),
		StoreModule.forRoot({}),
		EffectsModule.forRoot([UserEffect]),
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			logOnly: environment.production,
		}),
	],
	providers: [InterceptorProviders],
	bootstrap: [AppComponent],
})
export class AppModule {}
