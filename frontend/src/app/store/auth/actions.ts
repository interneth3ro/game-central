import { createAction, props } from '@ngrx/store';
import {
  LoginRequest,
  AuthResponse,
  RegisterRequest,
  ChangePassword,
} from '../../models/auth/auth.models';

const prefix = '[ Auth ]';

export const authResponse = createAction(
  `${prefix} Response`,
  props<{ payload: AuthResponse }>()
);

export const loginUser = createAction(
  `${prefix} Login User`,
  props<{ payload: AuthResponse }>()
);

export const updateTokens = createAction(
  `${prefix} Update Tokens`,
  props<{ payload: number }>()
);

export const logout = createAction(`${prefix} Logout`);
