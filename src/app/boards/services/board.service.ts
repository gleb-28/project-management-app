import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ColumnRequest, ColumnResponse } from 'src/app/models/column.models';
import { TaskRequest, TaskResponse } from 'src/app/models/task.models';
import { FileResponse } from 'src/app/models/file.models';
import { PointsRequest, PointsResponse } from 'src/app/models/points.models';


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

	public getTaskByIdsUserIdOrSearch(ids: [string], userId: string, search: string): Observable<TaskResponse[]> {
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

	public getFilesByIdsUserIdOrTaskId(ids: [string], userId: string, taskId: string): Observable<FileResponse[]> {
		const params = new HttpParams()
			.set('ids', JSON.stringify(ids))
			.set('userId', userId)
			.set('taskId', taskId);
		return this.http.get<FileResponse[]>('/file', { params: params });
	}

	public uploadFile(boardId: string, taskId: string, file: FileResponse): Observable<FileResponse[]> {
		const formData = new FormData();
		formData.append('boardId', boardId);
		formData.append('taskId', taskId);
		formData.append('file', JSON.stringify(file));
		return this.http.post<FileResponse[]>('/file', formData);
	}

	public getFilesByBoardId(boardId: string): Observable<FileResponse[]> {
		return this.http.get<FileResponse[]>(`/file/${boardId}`);
	}

	public deleteFileById(fileId: string): Observable<FileResponse> {
		return this.http.delete<FileResponse>(`/file/${fileId}`);
	}

	public getPointsByIdsListOrUserId(ids: [string], userId: string): Observable<PointsResponse[]> {
		const params = new HttpParams()
			.set('ids', JSON.stringify(ids))
			.set('userId', userId);
		return this.http.get<PointsResponse[]>('/points', { params: params });
	}

	public createPoint(pointData: PointsRequest): Observable<PointsResponse> {
		return this.http.post<PointsResponse>('/points', pointData);
	}

	public updateSetOfPoints(pointData: PointsRequest[]): Observable<PointsResponse> {
		return this.http.patch<PointsResponse>('/points', pointData);
	}

	public getPointsByTaskId(taskId: string): Observable<PointsResponse[]> {
		return this.http.get<PointsResponse[]>(`/points/${taskId}`);
	}

	public updatePoint(pointId: string, pointData: PointsRequest): Observable<PointsResponse> {
		return this.http.patch<PointsResponse>(`/points/${pointId}`, pointData);
	}

	public deletePointById(pointId: string): Observable<PointsResponse> {
		return this.http.delete<PointsResponse>(`/points/${pointId}`);
	}

}
