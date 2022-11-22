import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { BoardPageComponent } from './pages/board-page/board-page.component';

const routes: Routes = [
	{ path: '', component: MainPageComponent },
	{ path: 'board/:boardId', component: BoardPageComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class BoardsRoutingModule {}
