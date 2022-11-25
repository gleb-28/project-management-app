import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputTextModule } from 'primeng/inputtext';
import { FilterByPipe } from './pipes/filter-by-pipe/filter-by.pipe';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationService } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActiveBoardEffect } from '@app/store/effects/active-board-effect/active-board.effect';
import { BoardEffect } from '@app/store/effects/active-board-effect/board-effect/board.effect';
import { ColumnsEffect } from '@app/store/effects/active-board-effect/columns-effect/columns.effect';
import { FilesEffect } from '@app/store/effects/active-board-effect/files-effect/files.effect';
import { TasksEffect } from '@app/store/effects/active-board-effect/tasks-effect/tasks.effect';
import { BoardsEffect } from '@app/store/effects/boards-effect/boards.effect';
import { boardReducer } from '@app/store/reducers/active-board-reducer/board-reducer/board.reducer';
import { columnsReducer } from '@app/store/reducers/active-board-reducer/columns-reducer/columns.reducer';
import { filesReducer } from '@app/store/reducers/active-board-reducer/files-reducer/files.reducer';
import { tasksReducer } from '@app/store/reducers/active-board-reducer/tasks-reducer/tasks.reducer';
import { boardsReducer } from '@app/store/reducers/boards-reducer/boards.reducer';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { AvatarModule } from 'primeng/avatar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MembersEffect } from '@app/store/effects/active-board-effect/members-effect/members.effect';
import { membersReducer } from '@app/store/reducers/active-board-reducer/members-reducer/members.reducer';
import { BoardsRoutingModule } from './boards-routing.module';
import { BoardComponent } from './components/board/board.component';
import { ColumnComponent } from './components/column/column.component';
import { TaskComponent } from './components/task/task.component';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { BoardsService } from './services/boards/boards.service';
import { ColumnDragDropService } from './services/column-drag-drop/column-drag-drop.service';
import { ColumnsService } from './services/columns/columns.service';
import { FilesService } from './services/files/files.service';
import { PointsService } from './services/points/points.service';
import { SocketService } from './services/socketio/socket.service';
import { TaskDragDropService } from './services/task-drag-drop/task-drag-drop.service';
import { TasksService } from './services/tasks/tasks.service';


const PrimeNgModules = [
	ButtonModule,
	CardModule,
	SplitButtonModule,
	InputTextModule,
	ConfirmDialogModule,
	DialogModule,
	InputTextareaModule,
	AvatarGroupModule,
	AvatarModule,
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
		ReactiveFormsModule,
		FormsModule,
		...PrimeNgModules,
		StoreModule.forFeature('boards', boardsReducer),
		StoreModule.forFeature('activeBoard', {
			board: boardReducer,
			members: membersReducer,
			columns: columnsReducer,
			tasks: tasksReducer,
			files: filesReducer,
		}),
		EffectsModule.forFeature([
			BoardsEffect,
			ActiveBoardEffect,
			BoardEffect,
			MembersEffect,
			ColumnsEffect,
			TasksEffect,
			FilesEffect,
		]),
	],
	providers: [
		BoardsService,
		ColumnsService,
		TasksService,
		FilesService,
		PointsService,
		FilterByPipe,
		ConfirmationService,
		SocketService,
		TaskDragDropService,
		ColumnDragDropService,
	],
})
export class BoardsModule {}
