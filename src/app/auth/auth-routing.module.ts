import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];
// const routes: Routes = [
// 	{ path: '', pathMatch: 'full', redirectTo: 'login' },
// 	{ path: 'login', component: LoginPageComponent },
// 	{ path: 'registration', component: LoginPageComponent },
// ];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AuthRoutingModule {}
