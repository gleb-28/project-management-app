export interface TaskRequest {
  _id?: string;
  title?: string;
  order: number;
  description?: string;
  columnId?: string;
  userId?: number;
  users?: string[];
}

export interface TaskResponse {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
  userId: string;
  users: string[];
}