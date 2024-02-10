export interface AuthState {
  isLoggedIn: boolean;
  passwordChanged: boolean;
  currentUser: CurrentUser | null;
}

export interface CurrentUser {
  email?: string;
  name?: string;
  id?: string;
  tokens: number;
}
