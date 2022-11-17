import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { SocketioService } from './services/socketio/socketio.service';

@NgModule({
	declarations: [FilterByPipe],
	imports: [
		CommonModule,
		StoreModule.forFeature('boards', boardsReducer),
		StoreModule.forFeature('activeBoard', { columns: columnsReducer, tasks: tasksReducer, files: filesReducer }),
		EffectsModule.forFeature([BoardsEffect, ActiveBoardEffect, ColumnsEffect, TasksEffect, FilesEffect]),
	],
	providers: [BoardsService, ColumnsService, TasksService, FilesService, PointsService, FilterByPipe, SocketioService],
})
export class BoardsModule {}
