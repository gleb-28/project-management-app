export interface BoardRequest {
  title: string;
  owner: string;
  users: string[];
}

export interface BoardResponse {
  _id: string;
  title: string;
  owner: string;
  users: string[];
}