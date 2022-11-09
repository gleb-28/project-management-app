import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PointsRequest, PointsResponse } from 'src/app/models/points.models';
import { BoardsModule } from '../../boards.module';

@Injectable({
	providedIn: BoardsModule,
})
export class PointsService {

	constructor(private http: HttpClient) { }

	public getPointsByIdsListOrUserId(ids: string[], userId: string): Observable<PointsResponse[]> {
		const params = new HttpParams()
			.set('ids', ids.join(','))
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
