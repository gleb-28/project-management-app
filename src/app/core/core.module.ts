import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { AccordionModule } from 'primeng/accordion';

const PrimeNgModules = [SelectButtonModule, ButtonModule, SidebarModule, AccordionModule];

@NgModule({
	declarations: [FooterComponent, HeaderComponent, WelcomePageComponent, NotFoundPageComponent],
	imports: [CommonModule, FormsModule, ...PrimeNgModules],
	exports: [HeaderComponent, WelcomePageComponent, NotFoundPageComponent, FooterComponent],
})
export class CoreModule {}
