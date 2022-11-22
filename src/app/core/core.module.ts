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
import { RouterLink } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { PreloaderComponent } from './components/preloader/preloader/preloader.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

const PrimeNgModules = [SelectButtonModule, ButtonModule, SidebarModule, AccordionModule, ProgressSpinnerModule];

@NgModule({
	declarations: [FooterComponent, HeaderComponent, WelcomePageComponent, NotFoundPageComponent, PreloaderComponent],
	imports: [
		CommonModule,
		FormsModule,
		RouterLink,
		...PrimeNgModules,
		DialogModule,
		ReactiveFormsModule,
		InputTextModule,
	],
	exports: [HeaderComponent, WelcomePageComponent, NotFoundPageComponent, FooterComponent, PreloaderComponent],
})
export class CoreModule {}
