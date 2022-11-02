export interface ColumnRequest {
  _id?: string;
  title?: string;
  order: number;
  boardId?: string;
}

export interface ColumnResponse {
  _id: string;
  title: string;
  order: number;
  boardId: string;
}