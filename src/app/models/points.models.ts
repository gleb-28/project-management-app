import { UserId } from "./userId.model";

export interface PointsRequest {
  _id?: UserId;
  title?: string;
  taskId?: string;
  boardId?: string;
  done: boolean;
}

export interface PointsResponse {
  _id: UserId;
  name?: string;
  title?: string;
  order?: number;
  taskId?: string;
  boardId: string;
  path?: string;
  done?: boolean;
}
