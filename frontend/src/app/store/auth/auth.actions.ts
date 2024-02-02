import { createAction, props } from '@ngrx/store';
import { LoginRequest, AuthResponse, RegisterRequest, ChangePassword } from '../../models/auth/auth.models';

const prefix = '[ Auth ]';

export const loginRequest = createAction(
  `${prefix} Login Request`,
  props<{ payload: LoginRequest }>()
);

export const loginUser = createAction(
  `${prefix} Login User`,
  props<{ payload: AuthResponse }>()
);

export const authResponse = createAction(
  `${prefix} Response`,
  props<{ payload: AuthResponse }>()
);

export const registerRequest = createAction(
  `${prefix} Register Request`,
  props<{ payload: RegisterRequest }>()
);

export const logout = createAction(
  `${prefix} Logout`
);

export const changePassword = createAction(
  `${prefix} Change Password`,
  props<{ payload: ChangePassword }>()
);

export const passwordChanged = createAction(
  `${prefix} Password Changed`
);