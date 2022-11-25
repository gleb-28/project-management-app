import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { UserSettingsPageComponent } from './pages/user-settings-page/user-settings-page.component';
import { RouterLinkWithHref } from '@angular/router';

const Components = [SignUpPageComponent, SignInPageComponent, UserSettingsPageComponent];
const PrimeNgModules = [InputTextModule, ButtonModule, HttpClientModule];

@NgModule({
	declarations: [...Components],
	imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule, RouterLinkWithHref, ...PrimeNgModules],
})
export class AuthModule {}
