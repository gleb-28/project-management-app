import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { ColumnComponent } from './components/column/column.component';
import { TaskComponent } from './components/task/task.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { SplitButtonModule } from 'primeng/splitbutton';
import { BoardComponent } from './components/board/board.component';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { FilterByPipe } from './pipes/filter-by-pipe/filter-by.pipe';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { boardsReducer } from '../store/reducers/boards-reducer/boards.reducer';
import { BoardsEffect } from '../store/effects/boards-effect/boards.effect';
import { BoardsService } from './services/boards/boards.service';
import { ColumnsService } from './services/columns/columns.service';
import { TasksService } from './services/tasks/tasks.service';
import { FilesService } from './services/files/files.service';
import { PointsService } from './services/points/points.service';
import { boardReducer } from '../store/reducers/active-board-reducer/board-reducer/board.reducer';
import { columnsReducer } from '../store/reducers/active-board-reducer/columns-reducer/columns.reducer';
import { tasksReducer } from '../store/reducers/active-board-reducer/tasks-reducer/tasks.reducer';
import { filesReducer } from '../store/reducers/active-board-reducer/files-reducer/files.reducer';
import { ActiveBoardEffect } from '../store/effects/active-board-effect/active-board.effect';
import { BoardEffect } from '../store/effects/active-board-effect/board-effect/board.effect';
import { ColumnsEffect } from '../store/effects/active-board-effect/columns-effect/columns.effect';
import { TasksEffect } from '../store/effects/active-board-effect/tasks-effect/tasks.effect';
import { FilesEffect } from '../store/effects/active-board-effect/files-effect/files.effect';
import { BoardsRoutingModule } from './boards-routing.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationService } from 'primeng/api';
import { ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { TaskDragDropService } from './services/task-drag-drop/task-drag-drop.service';
import { ColumnDragDropService } from './services/column-drag-drop/column-drag-drop.service';

const PrimeNgModules = [
	ButtonModule,
	DragDropModule,
	PanelModule,
	TableModule,
	TabViewModule,
	CardModule,
	SplitButtonModule,
	CheckboxModule,
	InputTextModule,
	ConfirmDialogModule,
	DialogModule,
	AccordionModule,
];

const PageComponents = [MainPageComponent, BoardPageComponent];
const Components = [BoardComponent, ColumnComponent, TaskComponent];

@NgModule({
	declarations: [...PageComponents, ...Components, FilterByPipe],
	imports: [
		CommonModule,
		BoardsRoutingModule,
		ReactiveFormsModule,
		DragDropModule,
		...PrimeNgModules,
		StoreModule.forFeature('boards', boardsReducer),
		StoreModule.forFeature('activeBoard', {
			board: boardReducer,
			columns: columnsReducer,
			tasks: tasksReducer,
			files: filesReducer,
		}),
		EffectsModule.forFeature([BoardsEffect, ActiveBoardEffect, BoardEffect, ColumnsEffect, TasksEffect, FilesEffect]),
		ReactiveFormsModule,
	],
	providers: [
		BoardsService,
		ColumnsService,
		TasksService,
		FilesService,
		PointsService,
		FilterByPipe,
		ConfirmationService,
		TaskDragDropService,
		ColumnDragDropService,
	],
})
export class BoardsModule {}
