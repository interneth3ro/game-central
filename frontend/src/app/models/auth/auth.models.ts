export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  currentBalance: number;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ChangePassword {
  email?: string;
  oldPassword?: string;
  newPassword?: string;
}

export interface AuthUser {
  email: string;
  name: string;
  tokens: number;
}