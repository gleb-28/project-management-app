import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../app.state';
import { userReducer } from './user.reducer';

const reducers: ActionReducerMap<AppState> = {
	user: userReducer,
};

export default reducers;
