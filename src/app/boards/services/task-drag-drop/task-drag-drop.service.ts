import { Injectable } from '@angular/core';
import { ColumnId } from '@app/models/ids.model';
import { TaskResponse } from '@app/models/task.model';
import { updateTask } from '@app/store/actions/active-board-action/active-board.action';
import { selectAllTasks } from '@app/store/selectors/active-board-selector/tasks.selector';
import { Store } from '@ngrx/store';


@Injectable()
export class TaskDragDropService {
	private tasks$ = this.store.select(selectAllTasks).subscribe((tasks) => (this.allTasks = tasks));
	private allTasks: TaskResponse[] = [];
	private draggedTask: TaskResponse | null = null;

	constructor(private store: Store) {}

	public taskDragStart(task: TaskResponse): void {
		this.draggedTask = task;
	}

	private taskDragEnd(): void {
		this.draggedTask = null;
	}

	public changeTasksOrder(columnId: ColumnId, taskCurrentIndex: number): void {
		if (this.draggedTask) {
			const draggedTask = this.draggedTask;
			const newDraggedTaskOrder = taskCurrentIndex + 1;

			// if task order didn't change
			if (draggedTask.columnId === columnId && draggedTask.order === newDraggedTaskOrder) return this.taskDragEnd();

			const draggedTaskNextItemOrder = draggedTask.order + 1;
			const draggedTaskNewPrevItemOrder = newDraggedTaskOrder;

			// task dragged in the same column
			if (draggedTask.columnId === columnId) {
				// task drugged down
				if (newDraggedTaskOrder > draggedTask.order) {
					for (let i = draggedTaskNextItemOrder; i <= draggedTaskNewPrevItemOrder; i++) {
						const nextTaskToChange = this.getTaskInColumnByOrder(draggedTask.columnId, i);
						if (nextTaskToChange) {
							this.dispatchChangeTaskOrderAction(nextTaskToChange, i - 1);
						}
					}
				}
				// task dragged up
				if (newDraggedTaskOrder < draggedTask.order) {
					for (let i = newDraggedTaskOrder; i <= this.getTasksAmountInColumn(draggedTask.columnId); i++) {
						const nextTaskToChange = this.getTaskInColumnByOrder(draggedTask.columnId, i);
						if (nextTaskToChange) {
							this.dispatchChangeTaskOrderAction(nextTaskToChange, i + 1);
						}
					}
				}
			}
			// task dragged into another column
			if (draggedTask.columnId !== columnId) {
				for (let i = draggedTaskNextItemOrder; i <= this.getTasksAmountInColumn(draggedTask.columnId); i++) {
					const nextTaskToChange = this.getTaskInColumnByOrder(draggedTask.columnId, i);
					if (nextTaskToChange) {
						this.dispatchChangeTaskOrderAction(nextTaskToChange, i - 1);
					}
				}
				for (let i = newDraggedTaskOrder; i <= this.getTasksAmountInColumn(columnId); i++) {
					const nextTaskToChange = this.getTaskInColumnByOrder(columnId, i);
					if (nextTaskToChange) {
						this.dispatchChangeTaskOrderAction(nextTaskToChange, i + 1);
					}
				}
			}
			this.dispatchChangeTaskOrderAction(draggedTask, newDraggedTaskOrder, columnId);
			this.taskDragEnd();
		}
	}

	private dispatchChangeTaskOrderAction(task: TaskResponse, newOrder: number, newColumnId = task.columnId): void {
		this.store.dispatch(
			updateTask({
				boardId: task.boardId,
				columnId: task.columnId,
				taskId: task._id,
				taskData: {
					order: newOrder,
					columnId: newColumnId,
					title: task.title,
					description: task.description,
					userId: task.userId,
					users: task.users,
				},
			}),
		);
	}

	private getTaskInColumnByOrder(columnId: ColumnId, order: number): TaskResponse | undefined {
		return this.getAllTasksInColumn(columnId).find((task) => task.order === order);
	}

	private getTasksAmountInColumn(columnId: ColumnId): number {
		return this.getAllTasksInColumn(columnId).length;
	}

	private getAllTasksInColumn(columnId: ColumnId): TaskResponse[] {
		return this.allTasks.filter((task) => task.columnId === columnId);
	}
}
