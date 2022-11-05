import { UserId } from "./userId.model";

export interface ColumnRequest {
  _id?: UserId;
  title?: string;
  order: number;
  boardId?: string;
}

export interface ColumnResponse {
  _id: UserId;
  title: string;
  order: number;
  boardId: string;
}
