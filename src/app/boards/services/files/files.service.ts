import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileResponse } from 'src/app/models/file.model';

@Injectable()
export class FilesService {
	constructor(private http: HttpClient) {}

	public getFilesByIdsUserIdOrTaskId(props: {
		taskId?: string;
		userId?: string;
		columnIds?: string[];
	}): Observable<FileResponse[]> {
		const { taskId, userId, columnIds } = props;
		const params = new HttpParams();

		if (taskId) params.set('taskId', taskId);
		else if (userId) params.set('userId', userId);
		else if (columnIds?.length) params.set('ids', columnIds.join(','));

		return this.http.get<FileResponse[]>('/file', { params: params });
	}

	public uploadFile(formData: FormData): Observable<FileResponse[]> {
		return this.http.post<FileResponse[]>('/file', formData);
	}

	public getFilesByBoardId(boardId: string): Observable<FileResponse[]> {
		return this.http.get<FileResponse[]>(`/file/${boardId}`);
	}

	public deleteFileById(fileId: string): Observable<FileResponse> {
		return this.http.delete<FileResponse>(`/file/${fileId}`);
	}
}
