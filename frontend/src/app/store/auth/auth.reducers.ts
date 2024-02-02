import { Action, createReducer, on } from '@ngrx/store';
import { AuthState, CurrentUser } from './auth.state';

import * as actions from './index';
import { jwtDecode } from 'jwt-decode';

export const initialAuthState: AuthState = {
  isLoggedIn: false,
  passwordChanged: false,
  currentUser: null,
};

const reducer = createReducer<AuthState>(
  initialAuthState,
  on(actions.loginUser, (state, { payload }) => {
    const info = jwtDecode(payload.token) as any;
    
    return {
      ...state,
      isLoggedIn: true,
      currentUser: {
        email: info.email,
        name: info.name,
        id: info._id,
        tokens: payload.currentBalance
      }
    };
  }),
  on(actions.authResponse, (state, { payload }) => {
    localStorage.setItem('profile', JSON.stringify({ token: payload?.token, currentBalance: payload?.currentBalance }))
    const info = jwtDecode(payload.token) as any;

    return {
      ...state,
      isLoggedIn: true,
      currentUser: {
        email: info.email,
        name: info.name,
        id: info._id,
        tokens: payload.currentBalance
      }
    }
  }),
  on(actions.logout, (state) => {
    localStorage.clear();
    
    return {
      ...state,
      isLoggedIn: false,
      currentUser: null
    };
  }),
  on(actions.passwordChanged, (state) => {
    return {
      ...state,
      isLoggedIn: false,
      passwordChanged: true,
      currentUser: null
    };
  })
);

export function authReducer(state = initialAuthState, actions: Action): AuthState {
  return reducer(state, actions);
}