import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskRequest, TaskResponse } from 'src/app/models/task.models';
import { BoardsModule } from '../../boards.module';

@Injectable({
	providedIn: BoardsModule,
})
export class TasksService {

	constructor(private http: HttpClient) { }

	public getTasksInColumn(boardId: string, columnId: string): Observable<TaskResponse[]> {
		return this.http.get<TaskResponse[]>(`/boards/${boardId}/columns/${columnId}/tasks`);
	}

	public createTask(boardId: string, columnId: string, taskData: TaskRequest): Observable<TaskResponse> {
		return this.http.post<TaskResponse>(`/boards/${boardId}/columns/${columnId}/tasks`, taskData);
	}

	public getTaskById(boardId: string, columnId: string, taskId: string): Observable<TaskResponse> {
		return this.http.get<TaskResponse>(`/boards/${boardId}/columns/${columnId}/tasks/${taskId}`);
	}

	public updateTaskById(boardId: string, columnId: string, taskId: string, taskData: TaskRequest): Observable<TaskResponse> {
		return this.http.put<TaskResponse>(`/boards/${boardId}/columns/${columnId}/tasks/${taskId}`, taskData);
	}

	public deleteTaskById(boardId: string, columnId: string, taskId: string): Observable<TaskResponse> {
		return this.http.delete<TaskResponse>(`/boards/${boardId}/columns/${columnId}/tasks/${taskId}`);
	}

	public getTaskByIdsUserIdOrSearch(ids: string[], userId: string, search: string): Observable<TaskResponse[]> {
		const params = new HttpParams()
			.set('ids', ids.join(','))
			.set('userId', userId)
			.set('search', search);
		return this.http.get<TaskResponse[]>('/tasksSet', { params: params });
	}

	public updateSetOfTasks(tasks: TaskRequest[]): Observable<TaskResponse[]> {
		return this.http.patch<TaskResponse[]>('/tasksSet', tasks);
	}

	public getTaskByBoardId(boardId: string): Observable<TaskResponse[]> {
		return this.http.get<TaskResponse[]>(`/tasksSet/${boardId}`);
	}
}
