import { State } from './state.model';
import { PointResponse } from '../../models/point.model';

export interface PointsState extends State {
	boards: PointResponse[];
}
