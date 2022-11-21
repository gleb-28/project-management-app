import { Injectable } from '@angular/core';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { SocketActions, SocketEvents, SocketMessage } from 'src/app/models/socketio.model';
import { deleteBoardSuccess, getUserBoards } from 'src/app/store/actions/boards-action/boards.action';
import { deleteColumnSuccess, deleteFileSuccess, deleteTaskSuccess, loadColumns, loadFiles, loadTasks } from 'src/app/store/actions/active-board-action/active-board.action';
import { getUser } from 'src/app/store/actions/user-action/user.action';
import { selectUserId } from 'src/app/store/selectors/user-selector/user.selector';
import { ActivatedRoute } from '@angular/router';
import { selectAllUsersFromMyBoards } from 'src/app/store/selectors/boards-selector/boards.selector';


@Injectable({
	providedIn: 'root',
})
export class SocketioService {
	private socket: Socket<DefaultEventsMap, DefaultEventsMap> | null = null;
	private userId: string = '';

	constructor(private store: Store, private route: ActivatedRoute) { }

	private getUsersubscription() {
		this.store.select(selectUserId).subscribe((userId) => (this.userId = userId));
	}

	private isUserExistInList(message: SocketMessage): boolean {
		const { users, initUser, notify } = message;
		const allUsersInMyBoard = this.store.select(selectAllUsersFromMyBoards);

		return !!this.userId && initUser !== this.userId && notify && Array.isArray(users) && users?.includes(this.userId) && Array.isArray(allUsersInMyBoard) && allUsersInMyBoard?.includes(initUser);
	}

	private getBoardId(): string {
		return this.route.snapshot.paramMap.get('id')!;
	}

	private getUsersMessage(): void {
		if (this.socket) {
			this.socket.on(SocketEvents.USERS, (message: SocketMessage) => {

				if (this.isUserExistInList(message) && this.getBoardId()) {
					this.store.dispatch(getUser());
				}
			});
		}
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
			this.store.dispatch(getUserBoards({ userId: this.userId }));
		}
	}

	private getBoardsMessage(): void {
		this.socket?.on(SocketEvents.BOARDS, (message: SocketMessage) => {

			if (this.isUserExistInList(message) && this.getBoardId()) {
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
			const boardId = this.getBoardId();

			if (boardId) {
				this.store.dispatch(loadColumns({ boardId }));
			}
		}
	}

	private getColumnsMessage(): void {
		if (this.socket) {
			this.socket.on(SocketEvents.COLUMNS, (message) => {

				if (this.isUserExistInList(message) && this.getBoardId()) {
					this.updateColumnsData(message);
				}
			});
		}
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
			const boardId = this.getBoardId();

			if (boardId) {
				this.store.dispatch(loadTasks({ boardId }));
			}
		}
	}

	private getTasksMessage(): void {
		if (this.socket) {
			this.socket.on(SocketEvents.TASKS, (message) => {

				if (this.isUserExistInList(message) && this.getBoardId()) {
					this.updateTasksData(message);
				}
			});
		}
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
			const boardId = this.getBoardId();

			if (boardId) {
				this.store.dispatch(loadFiles({ boardId }));
			}
		}
	}

	private getFilesMessage(): void {
		if (this.socket) {
			this.socket.on(SocketEvents.FILES, (message) => {

				if (this.isUserExistInList(message) && this.getBoardId()) {
					this.updateFilesData(message);
				}
			});
		}
	}

	private subscribeAllMessages(): void {
		this.getUsersubscription();
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
		if (this.socket) {
			this.socket.disconnect();
		}
	}
}
