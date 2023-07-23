export type ApiResponse<T> = {
  status: string
  message?: string
  result?: T
}
