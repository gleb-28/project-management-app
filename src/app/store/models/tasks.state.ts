import { State } from './state.model';
import { TaskResponse } from '../../models/task.model';

export interface TasksState extends State {
	boards: TaskResponse[];
}
