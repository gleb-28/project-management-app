import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardPageComponent } from './boards/pages/board-page/board-page.component';
import { MainPageComponent } from './boards/pages/main-page/main-page.component';

const routes: Routes = [
	{ path: 'main', component: MainPageComponent },
	{ path: 'board/:boardId', component: BoardPageComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
