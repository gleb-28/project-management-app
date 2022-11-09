import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ColumnRequest, ColumnResponse } from 'src/app/models/column.models';
import { TaskRequest, TaskResponse } from 'src/app/models/task.models';


@Injectable({
	providedIn: 'root',
})
export class BoardService {

	constructor(private http: HttpClient) { }

	public getColumnsInBoard(boardId: string): Observable<ColumnResponse[]> {
		return this.http.get<ColumnResponse[]>(`/boards/${boardId}/columns`);
	}

	public createColumnInBoard(boardId: string, columnData: ColumnRequest): Observable<ColumnResponse> {
		return this.http.post<ColumnResponse>(`/boards/${boardId}/columns`, columnData);
	}

	public getColumnById(boardId: string, columnId: string): Observable<ColumnResponse> {
		return this.http.get<ColumnResponse>(`/boards/${boardId}/columns/${columnId}`);
	}

	public updateColumnById(boardId: string, columnId: string, columnData: ColumnRequest): Observable<ColumnResponse> {
		return this.http.put<ColumnResponse>(`/boards/${boardId}/columns/${columnId}`, columnData);
	}

	public deleteColumnById(boardId: string, columnId: string): Observable<ColumnResponse> {
		return this.http.delete<ColumnResponse>(`/boards/${boardId}/columns/${columnId}`);
	}

	public getColumnsByIdsListOrUserId(ids: [string], userId: string): Observable<ColumnResponse[]> {
		const params = new HttpParams()
			.set('ids', JSON.stringify(ids))
			.set('userId', userId);
		return this.http.get<ColumnResponse[]>('/columnsSet', { params: params });
	}

	public updateSetOfColumns(columns: [ColumnRequest]): Observable<ColumnResponse[]> {
		return this.http.patch<ColumnResponse[]>('/columnsSet', columns);
	}

	public createSetOfColumns(columns: [ColumnRequest]): Observable<ColumnResponse[]> {
		return this.http.post<ColumnResponse[]>('/columnsSet', columns);
	}

	public getTasksInColumns(boardId: string, columnId: string): Observable<TaskResponse[]> {
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

	public getTaskByIdUserIdOrSearch(ids: [string], userId: string, search: string): Observable<TaskResponse[]> {
		const params = new HttpParams()
			.set('ids', JSON.stringify(ids))
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
