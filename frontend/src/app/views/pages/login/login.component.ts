import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { authResponse } from '../../../store/auth/actions';
import { selectAuthState } from '../../../store/auth/selectors';
import { AuthService } from '../../../services/auth-service.service';

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
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.store.pipe(select(selectAuthState)).subscribe((auth) => {
      if (auth.isLoggedIn) {
        this.router.navigate(['/']);
      }
    });
  }

  login() {
    const credentials = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };

    this.authService.login(credentials).subscribe({
      next: (result) => {
        this.store.dispatch(authResponse({ payload: result }));
      },
      error: () => {
        this.loginFailed = true;
      },
    });
  }
}
