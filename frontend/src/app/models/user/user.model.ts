export interface User {
  username: string;
  userId: string;
  emailAddress: string;
  credits: number;
}

export interface CreateUserResult {
  created: boolean;
  error: unknown;
}

export interface GetUserResult {
  user: User | null;
  error: unknown;
}
