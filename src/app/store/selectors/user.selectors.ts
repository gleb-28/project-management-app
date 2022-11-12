import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User, UserState } from '../models/user.state';

export const selectUser = createFeatureSelector<UserState>('user');
export const selectIsUser = createFeatureSelector<User>('user');
export const selectUserId = createSelector(selectIsUser, ({ _id }) => _id);
export const selectUserName = createSelector(selectIsUser, ({ name }) => name);


