import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { BoardsComponent } from './components/boards/boards.component';
import { ColumnComponent } from './components/column/column.component';
import { TaskComponent } from './components/task/task.component';
import { DragDropModule } from 'primeng/dragdrop';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { BoardComponent } from './components/board/board.component';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { FilterByPipe } from './pipes/filter-by-pipe/filter-by.pipe';

const PrimeNgModules = [
	ButtonModule,
	DragDropModule,
	PanelModule,
	TableModule,
	TabViewModule,
	CardModule,
	CheckboxModule,
	InputTextModule,
];
@NgModule({
	declarations: [
		MainPageComponent,
		BoardPageComponent,
		BoardComponent,
		BoardsComponent,
		ColumnComponent,
		TaskComponent,
		FilterByPipe,
	],
	imports: [
		CommonModule,
		...PrimeNgModules,
	],
	providers: [FilterByPipe],
})
export class BoardsModule { }
