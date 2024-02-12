import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './state';

export const selectAuthState = createFeatureSelector<AuthState>('auth');
export const selectIsLoggedIn = createSelector(
  selectAuthState,
  (state) => state.isLoggedIn
);
export const selectCurrentUser = createSelector(
  selectAuthState,
  (state) => state.currentUser
);
