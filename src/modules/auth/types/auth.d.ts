export type User = {
  id: number
  email: string
  password: string
  refreshToken: string;
  token: string;
}

export type UserSession = Omit<User, 'password' | 'refreshToken'>
