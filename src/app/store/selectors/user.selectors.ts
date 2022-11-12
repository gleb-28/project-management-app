import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../models/user.state';

export const selectUser = createFeatureSelector<UserState>('user');
export const selectIsUserPending = createSelector(selectUser, ({ isPending }) => isPending);
export const selectUserLogin = createSelector(selectUser, ({ login }) => login);
export const selectUserId = createSelector(selectUser, ({ id }) => id);
