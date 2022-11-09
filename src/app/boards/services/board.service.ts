import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ColumnRequest, ColumnResponse } from 'src/app/models/column.models';


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

}
