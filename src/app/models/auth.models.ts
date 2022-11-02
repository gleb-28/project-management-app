export interface SignInRequest {
  login: string;
  password: string;
}

export interface SignInResponse {
  token: string;
}

export interface SignUpRequest {
  name: string;
  login: string;
  password: string;
}

export interface SignUpResponse {
  _id: string;
  name: string;
  login: string;
}