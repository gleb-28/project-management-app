import { ErrorResponse } from 'src/app/models/error.model';
import { ReqStatus } from '../enums/req-status';

export interface State {
	status: ReqStatus.Pending | ReqStatus.Loading | ReqStatus.Success | ReqStatus.Error;
	error:  ErrorResponse | null;
}
