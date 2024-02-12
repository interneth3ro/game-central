import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthService } from '../../../services/auth/auth.service';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../models/user/user.model';
import {
  RegisterRequest,
  RegisterResponse,
} from '../../../models/auth/auth.models';
import { loginUser } from '../../../store/auth/actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerFailed: boolean = false;

  registerForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  constructor(
    private readonly store: Store,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  async register() {
    const username = this.registerForm.get('username')?.value;
    const payload: RegisterRequest = {
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
    };

    const registerResult = await this.authService.register(payload);

    if (registerResult.userId !== '') {
      const user: User = {
        userId: registerResult.userId,
        username: username,
        emailAddress: payload.email,
        credits: 1000,
      };

      const createUserResult = await this.userService.createUser(user);

      if (createUserResult.created) {
        this.store.dispatch(loginUser({ payload: user }));
        this.router.navigate(['/']);
      } else if (!createUserResult.created && createUserResult.error !== null) {
        this.handleError(createUserResult.error);
      } else {
        this.handleError(null);
      }
    } else if (registerResult.userId === '' && registerResult.error !== null) {
      this.handleError(registerResult.error);
    } else {
      this.handleError(null);
    }
  }

  handleError(error: any): void {
    if (error !== null) {
      console.log(error);
    } else {
      console.log('Something went wrong');
    }
  }
}
