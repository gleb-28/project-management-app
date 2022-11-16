import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { UserSettingsPageComponent } from './pages/user-settings-page/user-settings-page.component';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

const COMPONENTS = [SignUpPageComponent, LoginPageComponent, UserSettingsPageComponent];
const PrimeNgModules = [InputTextModule, ButtonModule, HttpClientModule];

@NgModule({
	declarations: [...COMPONENTS],
	imports: [CommonModule, AuthRoutingModule, FormsModule, ReactiveFormsModule, TranslateModule, ...PrimeNgModules],
	exports: [...COMPONENTS],
})
export class AuthModule {}
