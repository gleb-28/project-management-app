import { Injectable } from '@angular/core';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { SocketActions, SocketEvents, SocketMessage } from 'src/app/models/socketio.model';
import { deleteBoardSuccess, getUserBoards } from 'src/app/store/actions/boards-action/boards.action';
import {
	deleteColumnSuccess,
	deleteFileSuccess,
	deleteTaskSuccess,
	loadColumns,
	loadFiles,
	loadTasks,
} from 'src/app/store/actions/active-board-action/active-board.action';
import { getUser } from 'src/app/store/actions/user-action/user.action';
import { selectUserId } from 'src/app/store/selectors/user-selector/user.selector';
import { ActivatedRoute } from '@angular/router';
import { selectActiveBoardFeature } from 'src/app/store/selectors/active-board-selector/active-board.selector';

@Injectable({
	providedIn: 'root',
})
export class SocketioService {
	private socket: Socket<DefaultEventsMap, DefaultEventsMap> | null = null;
	private userIdSubscription = this.store
		.select(selectUserId)
		.subscribe((userId) => (this.userId = userId));

	private boardIdSubscription = this.store
		.select(selectActiveBoardFeature)
		.subscribe((activeBoard) => (this.boardId = activeBoard?.board.board?._id!));

	private userId: string = '';
	private boardId: string = '';

	constructor(private store: Store, private route: ActivatedRoute) { }

	private isUserExistInList(message: SocketMessage): boolean {
		const { users, initUser, notify } = message;

		return (
			!!this.userId &&
			initUser !== this.userId &&
			notify &&
			Array.isArray(users) &&
			users?.includes(this.userId)
		);
	}

	private getUsersMessage(): void {
		this.socket?.on(SocketEvents.USERS, (message: SocketMessage) => {
			if (this.isUserExistInList(message)) {
				this.store.dispatch(getUser());
			}
		});
	}

	private getIsDeleteMessage(message: SocketMessage): boolean {
		return message?.action === SocketActions.DELETE;
	}

	private updateBoardsData(message: SocketMessage): void {
		if (this.getIsDeleteMessage(message)) {
			const boardIds = message?.ids;

			if (Array.isArray(boardIds)) {
				boardIds?.forEach((boardId) => {
					this.store.dispatch(deleteBoardSuccess({ boardId }));
				});
			}
		} else {
			if (this.userId) {
				this.store.dispatch(getUserBoards({ userId: this.userId }));
			}
		}
	}

	private getBoardsMessage(): void {
		this.socket?.on(SocketEvents.BOARDS, (message: SocketMessage) => {
			if (this.isUserExistInList(message)) {
				this.updateBoardsData(message);
			}
		});
	}

	private updateColumnsData(message: SocketMessage): void {
		if (this.getIsDeleteMessage(message)) {
			const columnIds = message?.ids;

			if (Array.isArray(columnIds)) {
				columnIds?.forEach((columnId) => {
					this.store.dispatch(deleteColumnSuccess({ columnId }));
				});
			}
		} else {
			if (this.boardId) {
				this.store.dispatch(loadColumns({ boardId: this.boardId }));
			}
		}
	}

	private getColumnsMessage(): void {
		this.socket?.on(SocketEvents.COLUMNS, (message) => {
			if (this.isUserExistInList(message)) {
				this.updateColumnsData(message);
			}
		});
	}

	private updateTasksData(message: SocketMessage): void {
		if (this.getIsDeleteMessage(message)) {
			const taskIds = message?.ids;

			if (Array.isArray(taskIds)) {
				taskIds?.forEach((taskId) => {
					this.store.dispatch(deleteTaskSuccess({ taskId }));
				});
			}
		} else {
			if (this.boardId) {
				this.store.dispatch(loadTasks({ boardId: this.boardId }));
			}
		}
	}

	private getTasksMessage(): void {
		this.socket?.on(SocketEvents.TASKS, (message) => {
			if (this.isUserExistInList(message)) {
				this.updateTasksData(message);
			}
		});

	}

	private updateFilesData(message: SocketMessage): void {
		if (this.getIsDeleteMessage(message)) {
			const fileIds = message?.ids;

			if (Array.isArray(fileIds)) {
				fileIds?.forEach((fileId) => {
					this.store.dispatch(deleteFileSuccess({ fileId }));
				});
			}
		} else {
			if (this.boardId) {
				this.store.dispatch(loadFiles({ boardId: this.boardId }));
			}
		}
	}

	private getFilesMessage(): void {
		this.socket?.on(SocketEvents.FILES, (message) => {
			if (this.isUserExistInList(message)) {
				this.updateFilesData(message);
			}
		});

	}

	private subscribeAllMessages(): void {
		this.getUsersMessage();
		this.getBoardsMessage();
		this.getColumnsMessage();
		this.getTasksMessage();
		this.getFilesMessage();
	}

	public setupSocketConnection(): void {
		this.socket = io(environment.SOCKET_ENDPOINT);

		if (this.socket) {
			this.subscribeAllMessages();
		}
	}

	public disconnect(): void {
		if (this.socket?.connected) {
			this.socket.disconnect();
		}

		this.userIdSubscription.unsubscribe();
		this.boardIdSubscription.unsubscribe();
	}
}
