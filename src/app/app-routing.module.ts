import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './core/pages/not-found-page/not-found-page.component';
import { WelcomePageComponent } from './core/pages/welcome-page/welcome-page.component';
import { AuthGuard } from './auth/guards/auth-guard/auth.guard';
import { SignInPageComponent } from './auth/pages/sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './auth/pages/sign-up-page/sign-up-page.component';
import { UserSettingsPageComponent } from './auth/pages/user-settings-page/user-settings-page.component';

const routes: Routes = [
	{ path: '', redirectTo: 'boards', pathMatch: 'full' },
	{
		path: 'welcome',
		component: WelcomePageComponent,
	},
	{
		path: 'boards',
		loadChildren: () => import('./boards/boards.module').then((m) => m.BoardsModule),
		canLoad: [AuthGuard],
		canActivate: [AuthGuard],
	},
	{ path: 'sign-in', component: SignInPageComponent },
	{ path: 'sign-up', component: SignUpPageComponent },
	{ path: 'user-settings', component: UserSettingsPageComponent, canActivate: [AuthGuard] },
	{ path: '**', component: NotFoundPageComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
