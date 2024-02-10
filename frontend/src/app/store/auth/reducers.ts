import { Action, createReducer, on } from '@ngrx/store';
import { AuthState } from './state';
import { loginUser, authResponse, logout, updateTokens } from './actions';
import { jwtDecode } from 'jwt-decode';

export const initialAuthState: AuthState = {
  isLoggedIn: false,
  passwordChanged: false,
  currentUser: null,
};

const reducer = createReducer<AuthState>(
  initialAuthState,
  on(loginUser, (state, { payload }) => {
    const info = jwtDecode(payload.token) as any;

    return {
      ...state,
      isLoggedIn: true,
      currentUser: {
        email: info.email,
        name: info.name,
        id: info._id,
        tokens: payload.currentBalance,
      },
    };
  }),
  on(authResponse, (state, { payload }) => {
    localStorage.setItem(
      'profile',
      JSON.stringify({
        token: payload?.token,
        currentBalance: payload?.currentBalance,
      })
    );
    const info = jwtDecode(payload.token) as any;

    return {
      ...state,
      isLoggedIn: true,
      currentUser: {
        email: info.email,
        name: info.name,
        id: info._id,
        tokens: payload.currentBalance,
      },
    };
  }),
  on(logout, (state) => {
    localStorage.clear();

    return {
      ...state,
      isLoggedIn: false,
      currentUser: null,
    };
  }),
  on(updateTokens, (state, { payload }) => {
    const profile = JSON.parse(localStorage.getItem('profile') || '');
    profile.currentBalance = payload;
    localStorage.setItem('profile', JSON.stringify(profile));

    return {
      ...state,
      currentUser: {
        ...state.currentUser,
        tokens: payload,
      },
    };
  })
);

export function authReducer(
  state = initialAuthState,
  actions: Action
): AuthState {
  return reducer(state, actions);
}
