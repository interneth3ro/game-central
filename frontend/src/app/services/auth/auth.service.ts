import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  UserCredential,
} from '@angular/fire/auth';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from '../../models/auth/auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}

  async login(loginRequest: LoginRequest): Promise<LoginResponse> {
    try {
      const credentials: UserCredential = await signInWithEmailAndPassword(
        this.auth,
        loginRequest.email,
        loginRequest.password
      );

      return {
        userId: credentials.user.uid,
        error: null,
      };
    } catch (error) {
      return {
        userId: '',
        error: error,
      };
    }
  }

  async register(registerForm: RegisterRequest): Promise<RegisterResponse> {
    try {
      const credentials: UserCredential = await createUserWithEmailAndPassword(
        this.auth,
        registerForm.email,
        registerForm.password
      );

      return {
        userId: credentials.user.uid,
        error: null,
      };
    } catch (error) {
      return {
        userId: '',
        error: error,
      };
    }
  }

  logout() {
    return signOut(this.auth);
  }
}
