import { UserId } from "./userId.model";

export interface TaskRequest {
  _id?: UserId;
  title?: string;
  order: number;
  description?: string;
  columnId?: string;
  userId?: number;
  users?: UserId[];
}

export interface TaskResponse {
  _id: UserId;
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
  userId: string;
  users: UserId[];
}
