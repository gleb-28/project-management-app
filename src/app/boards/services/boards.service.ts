import { Injectable } from '@angular/core';
import { BoardRequest, BoardResponse } from 'src/app/models/board.models';
import { Domain, Path } from 'src/app/models/endpoints.model';

@Injectable({
	providedIn: 'root',
})

export class BoardsService {

	private domain: string;

	constructor() {
		this.domain = Domain.BASE;
	}

	public async getAllBoards(): Promise<BoardResponse[]> {
		try {
			let res: Response;
			res = await fetch(`${this.domain}/${Path.BOARDS}`);
			const boards: BoardResponse[] = await res.json();
			return boards;
		} catch (error:any) {
			return error.message;
		}
	}

	public async createBoard(parameters: BoardRequest): Promise<BoardResponse> {
		try {
			const res = await fetch(`${this.domain}/${Path.BOARDS}`, {
				method: 'POST',
				headers: {
					accept: 'application/json',
					'Content-type': 'application/json',
				},
				body: JSON.stringify(parameters),
			});
			const board: BoardResponse = await res.json();
			return board;
		} catch (error: any) {
			return error.message;
		}
	}

	public async getBoardById(boardId: string): Promise<BoardResponse> {
		try {
			const res = await fetch(`${this.domain}/${Path.BOARDS}/${boardId}`);
			const board: BoardResponse = await res.json();
			return board;
		} catch (error: any) {
			return error.message;
		}
	}

	public async updateBoardById(boardId: string, parameters: BoardRequest): Promise<BoardResponse> {
		try {
			const res = await fetch(`${this.domain}/${Path.BOARDS}/${boardId}`, {
				method: 'PUT',
				headers: {
					accept: 'application/json',
					'Content-type': 'application/json',
				},
				body: JSON.stringify(parameters),
			});
			const updatedBoard: BoardResponse = await res.json();
			return updatedBoard;
		} catch (error: any) {
			return error.message;
		}
	}

	public async deleteBoardById(boardId: string): Promise<void> {
		try {
			await fetch(`${this.domain}/${Path.BOARDS}/${boardId}`, {
				method: 'DELETE',
				headers: {
					accept: 'application/json',
					'Content-type': 'application/json',
				},
			});
		} catch (error: any) {
			return error.message;
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public async getBoardsByIdsList(ids:[string]): Promise<BoardResponse[]> {
		try {
			let res: Response;
			res = await fetch(`${this.domain}/${Path.BOARDSSET}`);
			const boards: BoardResponse[] = await res.json();
			return boards;
		} catch (error: any) {
			return error.message;
		}
	}

	public async getBoardsByUserId(userId: string): Promise<BoardResponse[]> {
		try {
			let res: Response;
			res = await fetch(`${this.domain}/${Path.BOARDSSET}/${userId}`);
			const boards: BoardResponse[] = await res.json();
			return boards;
		} catch (error: any) {
			return error.message;
		}
	}

}
