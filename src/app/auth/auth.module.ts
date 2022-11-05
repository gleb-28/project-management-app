import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { UserSettingsPageComponent } from './pages/user-settings-page/user-settings-page.component';
import { ButtonModule } from 'primeng/button';
import { TemplateFormComponent } from './components/template-form/template-form.component';

const COMPONENTS = [SignUpPageComponent,  LoginPageComponent, UserSettingsPageComponent, UserSettingsPageComponent];
const PrimeNgModules = [InputTextModule, ButtonModule];
@NgModule({
	declarations: [...COMPONENTS, TemplateFormComponent],
	imports: [CommonModule, FormsModule, ReactiveFormsModule, ...PrimeNgModules],
	exports: [...COMPONENTS],
})
export class AuthModule {}
