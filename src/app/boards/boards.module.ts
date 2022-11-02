import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './pages/main/main.component';
import { BoardComponent } from './pages/board/board.component';
import { BoardsComponent } from './components/boards/boards.component';
import { ColumnComponent } from './components/column/column.component';
import { TaskComponent } from './components/task/task.component';

@NgModule({
	declarations: [
		MainComponent,
		BoardComponent,
		BoardsComponent,
		ColumnComponent,
		TaskComponent
	],
	imports: [CommonModule],
})
export class BoardsModule { }
