import { UserState } from './models/user.state';
import { BoardsState } from './models/boards.state';
import { ColumnsState } from './models/columns.state';
import { TasksState } from './models/tasks.state';
import { FilesState } from './models/files.state';
import { PointsState } from './models/points.state';

export interface AppState {
	user: UserState;
	boards?: BoardsState;
	columns?: ColumnsState;
	tasks?: TasksState;
	files?: FilesState;
	points?: PointsState;
}
