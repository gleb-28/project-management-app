export interface UserResponse {
  id: string
  name: string
  login: string
}

export interface UserRequest {
  name: string
  login: string
  password: string
}

export interface SignInRequest {
  login: string
  password: string
}

export interface SignInResponse {
  token: string
}

export interface SignUpRequest {
  name: string
  login: string
  password: string
}

export interface SignUpResponse {
  id: string
  name: string
  login: string
}

export interface BoardRequest {
  title: string
  description: string
}

export interface BoardResponse {
  id: string
  title: string
  description: string
  columns?: ColumnResponse[]
}

export interface ColumnRequest {
  title: string
  order?: number
}

export interface ColumnResponse {
  id: string
  title: string
  order: number
  tasks?: TaskResponse[]
}

export interface TaskRequest {
  title: string
  order?: number
  description: string
  userId: string
  boardId?: string
  columnId?: string
}

export interface TaskResponse {
  id: string
  title: string
  order?: number
  description: string
  userId: string
  boardId?: string
  columnId?: string
  files?: File[]
}

export interface FileResponse {
  filename: string
  fileSize: number
}

export interface ErrorResponse {
  statusCode: number
  message: string
}