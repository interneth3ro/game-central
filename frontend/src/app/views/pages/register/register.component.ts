import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { authResponse } from '../../../store/auth/actions';
import { AuthService } from '../../../services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerFailed: boolean = false;

  registerForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  constructor(
    private readonly store: Store,
    private authService: AuthService
  ) {}

  register() {
    const payload = {
      firstName: this.registerForm.get('firstName')?.value,
      lastName: this.registerForm.get('lastName')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
      confirmPassword: this.registerForm.get('confirmPassword')?.value,
    };

    this.authService.register(payload).subscribe({
      next: (result) => {
        this.store.dispatch(authResponse({ payload: result }));
      },
      error: () => {
        this.registerFailed = true;
      },
    });
  }
}
