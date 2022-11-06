import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];
// const routes: Routes = [
// 	{ path: '', component: BoardsPageComponent },
// 	{ path: ':/boardId', component: BoardComponent },
// ];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class BoardsRoutingModule {}
