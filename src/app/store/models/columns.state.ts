import { State } from './state.model';
import { ColumnResponse } from '../../models/column.model';

export interface ColumnsState extends State {
	columns: ColumnResponse[];
}
