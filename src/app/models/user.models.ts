export interface UserRequest {
  name: string;
  login: string;
  password: string;
}

export interface UserResponse {
  _id: string;
  name: string;
  login: string;
}