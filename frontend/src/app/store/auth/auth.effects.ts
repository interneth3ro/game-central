import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';

import * as actions from './index';
import { AuthService } from '../../services/auth-service.service';
import { AuthResponse } from '../../models/auth/auth.models';

@Injectable()
export class AuthEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly authService: AuthService) { }

  login$ = createEffect(() => 
    this.actions$.pipe(
      ofType(actions.loginRequest.type),
      switchMap(({payload}) => this.authService.login(payload)),
      map((response: AuthResponse) => actions.authResponse({payload: response}))
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.registerRequest.type),
      switchMap(({payload}) => this.authService.register(payload)),
      map((response: AuthResponse) => actions.authResponse({ payload: response }))
    )
  );

  changePassword$ = createEffect(() => 
    this.actions$.pipe(
      ofType(actions.changePassword.type),
      switchMap(({payload}) => this.authService.changePassword(payload)),
      map(() => actions.passwordChanged())
    )
  );
}