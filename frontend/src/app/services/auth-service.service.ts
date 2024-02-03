import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  LoginRequest,
  AuthResponse,
  RegisterRequest,
  ChangePassword,
} from '../models/auth/auth.models';
import { select, Store } from '@ngrx/store';
import { selectIsLoggedIn } from '../store/auth/selectors';
import { Observable } from 'rxjs';

const BASE_URL: string = 'http://localhost:5000/api/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLoggedIn$: Observable<boolean>;

  constructor(private httpClient: HttpClient, private readonly store: Store) {
    this.isLoggedIn$ = this.store.pipe(select(selectIsLoggedIn));
  }

  login(credentials: LoginRequest) {
    return this.httpClient.post<AuthResponse>(`${BASE_URL}/login`, credentials);
  }

  register(registerForm: RegisterRequest) {
    return this.httpClient.post<AuthResponse>(
      `${BASE_URL}/signup`,
      registerForm
    );
  }

  changePassword(changePasswordInfo: ChangePassword) {
    return this.httpClient.post(
      `${BASE_URL}/changePassword`,
      changePasswordInfo
    );
  }
}
