export interface PointsRequest {
  _id?: string;
  title?: string;
  taskId?: string;
  boardId?: string;
  done: boolean;
}

export interface PointsResponse {
  _id: string;
  name?: string;
  title?: string;
  order?: number;
  taskId?: string;
  boardId: string;
  path?: string;
  done?: boolean;
}