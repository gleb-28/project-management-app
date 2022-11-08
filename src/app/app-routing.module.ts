import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardPageComponent } from './boards/pages/board/board.component';
import { MainPageComponent } from './boards/pages/main/main.component';

const routes: Routes = [
	{ path: 'main', component: MainPageComponent },
	{ path: 'board', component: BoardPageComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule { }
