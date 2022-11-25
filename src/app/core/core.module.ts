import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { AccordionModule } from 'primeng/accordion';
import { RouterLink, RouterLinkWithHref } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TranslateModule } from '@ngx-translate/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { ErrorToastComponent } from './components/error-toast/error-toast.component';
import { ToastModule } from 'primeng/toast';

const Components = [
	HeaderComponent,
	WelcomePageComponent,
	FooterComponent,
	NotFoundPageComponent,
	PreloaderComponent,
	ErrorToastComponent,
];
const PrimeNgModules = [
	SelectButtonModule,
	ButtonModule,
	SidebarModule,
	AccordionModule,
	ProgressSpinnerModule,
	ToastModule,
	InputTextModule,
];

@NgModule({
	declarations: [...Components],
	imports: [
		CommonModule,
		FormsModule,
		RouterLink,
		TranslateModule,
		DialogModule,
		ReactiveFormsModule,
		RouterLinkWithHref,
		...PrimeNgModules,
	],
	exports: [...Components],
})
export class CoreModule {}
