import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { BoardRequest, BoardResponse } from 'src/app/models/board.model';
import { UserService } from 'src/app/auth/service/user.service';
import { SignUpResponse } from 'src/app/models/auth.model';
import { BoardId } from '../../../models/ids.model';

@Injectable()
export class BoardsService {
	constructor(private http: HttpClient, private userService: UserService) {}

	public getAllBoards(): Observable<BoardResponse[]> {
		return this.http.get<BoardResponse[]>('/boards');
	}

	public createBoard(boardData: BoardRequest): Observable<BoardResponse> {
		return this.http.post<BoardResponse>('/boards', boardData);
	}

	public getBoardById(boardId: string): Observable<BoardResponse> {
		return this.http.get<BoardResponse>(`/boards/${boardId}`);
	}

	public updateBoardById(boardId: string, boardsData: BoardRequest): Observable<BoardResponse> {
		return this.http.put<BoardResponse>(`/boards/${boardId}`, boardsData);
	}

	public deleteBoardById(boardId: string): Observable<BoardResponse> {
		return this.http.delete<BoardResponse>(`/boards/${boardId}`);
	}

	public getBoardsByIdsList(ids: string[]): Observable<BoardResponse[]> {
		const params = new HttpParams().set('ids', ids.join(','));
		return this.http.get<BoardResponse[]>('/boardsSet', { params: params });
	}

	public getBoardsByUserId(userId: string): Observable<BoardResponse[]> {
		return this.http.get<BoardResponse[]>(`/boardsSet/${userId}`);
	}

	public getBoardMembersByBoardId(boardId: BoardId): Observable<SignUpResponse[]> {
		let boardUsers: SignUpResponse[] = [];
		this.getBoardById(boardId).subscribe((board) => {
			const userIds = board.users;

			userIds.forEach((userId) => {
				this.userService.getUser(userId).subscribe((userInfo) => (boardUsers = [...boardUsers, userInfo]));
			});
		});
		return of(boardUsers);
	}
}
