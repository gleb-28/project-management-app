import { UserState } from '@app/store/models/user.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectUserState = createFeatureSelector<UserState>('user');
export const selectUser = createSelector(selectUserState, ({ user }) => user);
export const selectUserId = createSelector(selectUser, ({ _id }) => _id);
export const selectIsLogged = createSelector(selectUser, ({ _id }) => Boolean(_id));
