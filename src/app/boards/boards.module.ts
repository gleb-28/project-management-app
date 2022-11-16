import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { BoardPageComponent } from './pages/board-page/board-page.component';
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
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { boardsReducer } from '../store/reducers/boards-reducer/boards.reducer';
import { BoardsEffect } from '../store/effects/boards-effect/boards.effect';
import { BoardsService } from './services/boards/boards.service';
import { ColumnsService } from './services/columns/columns.service';
import { TasksService } from './services/tasks/tasks.service';
import { FilesService } from './services/files/files.service';
import { PointsService } from './services/points/points.service';
import { columnsReducer } from '../store/reducers/active-board-reducer/columns-reducer/columns.reducer';
import { tasksReducer } from '../store/reducers/active-board-reducer/tasks-reducer/tasks.reducer';
import { filesReducer } from '../store/reducers/active-board-reducer/files-reducer/files.reducer';
import { ActiveBoardEffect } from '../store/effects/active-board-effect/active-board.effect';
import { ColumnsEffect } from '../store/effects/active-board-effect/columns-effect/columns.effect';
import { TasksEffect } from '../store/effects/active-board-effect/tasks-effect/tasks.effect';
import { FilesEffect } from '../store/effects/active-board-effect/files-effect/files.effect';

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

const PageComponents = [MainPageComponent, BoardPageComponent];
const Components = [BoardComponent, ColumnComponent, TaskComponent];

@NgModule({
	declarations: [...PageComponents, ...Components, FilterByPipe],
	imports: [
		CommonModule,
		...PrimeNgModules,
		StoreModule.forFeature('boards', boardsReducer),
		StoreModule.forFeature('activeBoard', { columns: columnsReducer, tasks: tasksReducer, files: filesReducer }),
		EffectsModule.forFeature([BoardsEffect, ActiveBoardEffect, ColumnsEffect, TasksEffect, FilesEffect]),
	],
	providers: [BoardsService, ColumnsService, TasksService, FilesService, PointsService, FilterByPipe],
})
export class BoardsModule {}
