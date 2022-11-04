import { UserId } from "./userId.model";

export interface BoardRequest {
  title: string;
  owner: string;
  users: UserId[];
}

export interface BoardResponse {
  _id: UserId;
  title: string;
  owner: string;
  users: UserId[];
}
