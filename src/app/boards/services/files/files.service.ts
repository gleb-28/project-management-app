import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileResponse } from 'src/app/models/file.models';
import { BoardsModule } from '../../boards.module';

@Injectable({
	providedIn: BoardsModule,
})
export class FilesService {

	constructor(private http: HttpClient) { }

	public getFilesByIdsUserIdOrTaskId(ids: string[], userId: string, taskId: string): Observable<FileResponse[]> {
		const params = new HttpParams()
			.set('ids', ids.join(','))
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
}
