import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthService } from '../../../services/auth/auth.service';
import { UserService } from '../../../services/user/user.service';
import { loginUser } from '../../../store/auth/actions';
import { LoginRequest, LoginResponse } from '../../../models/auth/auth.models';
import { GetUserResult } from '../../../models/user/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginFailed: boolean = false;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private readonly store: Store,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  async login() {
    const credentials: LoginRequest = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };

    const loginResponse: LoginResponse = await this.authService.login(
      credentials
    );
    if (loginResponse.userId !== '') {
      const userResult: GetUserResult = await this.userService.getUserById(
        loginResponse.userId
      );

      if (userResult.user !== null) {
        this.store.dispatch(loginUser({ payload: userResult.user }));
        this.router.navigate(['/']);
      } else {
        console.log(loginResponse.error);
      }
    } else {
      console.log(loginResponse.error);
    }
  }
}
