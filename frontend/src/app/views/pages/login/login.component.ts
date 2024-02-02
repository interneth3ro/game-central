import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as actions from '../../../store/auth/auth.actions';
import { selectAuthState } from 'src/app/store/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(
    private readonly store: Store,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.store.pipe(select(selectAuthState)).subscribe(auth => {
      if (auth.isLoggedIn) {
        this.router.navigate(['/']);
      }
    });
  }

  login() {
    this.store.dispatch(actions.loginRequest({ payload: {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    }}));
  }

}
