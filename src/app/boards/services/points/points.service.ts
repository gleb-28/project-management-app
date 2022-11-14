import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PointRequest, PointResponse } from 'src/app/models/point.model';

@Injectable()
export class PointsService {
	constructor(private http: HttpClient) {}

	public getPointsByIdsListOrUserId(ids: string[], userId: string): Observable<PointResponse[]> {
		const params = new HttpParams().set('ids', ids.join(',')).set('userId', userId);
		return this.http.get<PointResponse[]>('/points', { params: params });
	}

	public createPoint(pointData: PointRequest): Observable<PointResponse> {
		return this.http.post<PointResponse>('/points', pointData);
	}

	public updateSetOfPoints(pointData: PointRequest[]): Observable<PointResponse> {
		return this.http.patch<PointResponse>('/points', pointData);
	}

	public getPointsByTaskId(taskId: string): Observable<PointResponse[]> {
		return this.http.get<PointResponse[]>(`/points/${taskId}`);
	}

	public updatePoint(pointId: string, pointData: PointRequest): Observable<PointResponse> {
		return this.http.patch<PointResponse>(`/points/${pointId}`, pointData);
	}

	public deletePointById(pointId: string): Observable<PointResponse> {
		return this.http.delete<PointResponse>(`/points/${pointId}`);
	}
}
