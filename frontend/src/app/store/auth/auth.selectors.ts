import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.state";

export const selectAuthState = createFeatureSelector<AuthState>('auth');
export const selectIsLoggedIn = createSelector(selectAuthState, (state) => state.isLoggedIn);
export const selectPasswordChanged = createSelector(selectAuthState, (state) => state.passwordChanged);
export const selectCurrentUser = createSelector(selectAuthState, (state) => state.currentUser);