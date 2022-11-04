import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { UserSettingsPageComponent } from './pages/user-settings-page/user-settings-page.component';
import { ButtonModule } from 'primeng/button';

const COMPONENTS = [SignUpPageComponent,  LoginPageComponent, UserSettingsPageComponent, UserSettingsPageComponent];

@NgModule({
	declarations: [...COMPONENTS],
	imports: [CommonModule, FormsModule, ReactiveFormsModule, InputTextModule, ButtonModule],
	exports: [...COMPONENTS],
})
export class AuthModule {}
