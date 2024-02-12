import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user/user.model';

const prefix = '[ Auth ]';

export const loginUser = createAction(
  `${prefix} Login User`,
  props<{ payload: User }>()
);

export const logout = createAction(`${prefix} Logout`);
