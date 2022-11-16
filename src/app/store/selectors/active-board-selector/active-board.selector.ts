import { createFeatureSelector } from '@ngrx/store';
import { ActiveBoardState } from '../../models/active-board.state';

export const selectActiveBoardFeature = createFeatureSelector<ActiveBoardState>('activeBoard');
