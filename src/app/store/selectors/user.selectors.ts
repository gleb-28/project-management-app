import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../models/user.state';

export const selectUserState = createFeatureSelector<UserState>('user');
export const selectUser = createSelector(selectUserState, ({ user }) => user);
export const selectUserId = createSelector(selectUser, ({ _id }) => _id);



