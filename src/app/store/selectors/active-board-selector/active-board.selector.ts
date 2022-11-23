import { ActiveBoardState } from '@app/store/models/active-board.state';
import { createFeatureSelector } from '@ngrx/store';

export const selectActiveBoardFeature = createFeatureSelector<ActiveBoardState>('activeBoard');
