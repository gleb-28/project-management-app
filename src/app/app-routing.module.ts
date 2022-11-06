import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './core/pages/not-found-page/not-found-page.component';
import { WelcomePageComponent } from './core/pages/welcome-page/welcome-page.component';
import { AuthGuard } from './auth/guards/auth-guard/auth.guard';
import { LoggedAuthGuard } from './auth/guards/logged-auth-guard/logged-auth.guard';

const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'boards' },
	{
		path: 'welcome',
		component: WelcomePageComponent,
		canLoad: [LoggedAuthGuard],
	},
	{
		path: 'boards',
		loadChildren: () => import('./boards/boards.module').then((m) => m.BoardsModule),
		canLoad: [AuthGuard],
	},
	{
		path: 'auth',
		loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
		canLoad: [LoggedAuthGuard],
	},
	{ path: '**', component: NotFoundPageComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
