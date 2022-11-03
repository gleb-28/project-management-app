import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

const COMPONENTS = [SignUpPageComponent,  LoginPageComponent];

@NgModule({
	declarations: [...COMPONENTS],
	imports: [CommonModule, FormsModule, ReactiveFormsModule, InputTextModule, PasswordModule],
	exports: [...COMPONENTS],
})
export class AuthModule {}
