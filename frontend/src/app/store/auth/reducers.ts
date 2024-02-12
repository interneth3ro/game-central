import { Action, createReducer, on } from '@ngrx/store';
import { AuthState } from './state';
import { loginUser, logout } from './actions';

export const initialAuthState: AuthState = {
  isLoggedIn: false,
  currentUser: null,
};

const reducer = createReducer<AuthState>(
  initialAuthState,
  on(loginUser, (state, { payload }) => {
    return {
      ...state,
      isLoggedIn: true,
      currentUser: payload,
    };
  }),
  on(logout, (state) => {
    localStorage.clear();

    return {
      ...state,
      isLoggedIn: false,
      currentUser: null,
    };
  })
);

export function authReducer(
  state = initialAuthState,
  actions: Action
): AuthState {
  return reducer(state, actions);
}
