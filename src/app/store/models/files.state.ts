import { State } from './state.model';
import { FileResponse } from '../../models/file.model';

export interface FilesState extends State {
	boards: FileResponse[];
}
