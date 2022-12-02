import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import * as fromBoard from '@app/store/actions/active-board-action/active-board.action';
import { FileResponse } from '@app/models/file.model';
import { ReqStatus } from '@app/store/enums/req-status';
import { FilesState } from '@app/store/models/active-board.state';

export const filesAdapter: EntityAdapter<FileResponse> = createEntityAdapter<FileResponse>({
	selectId: (file) => file._id,
	sortComparer: false,
});

export const filesInitialState: FilesState = filesAdapter.getInitialState({
	status: ReqStatus.Pending,
	error: null,
});

export const filesReducer = createReducer(
	filesInitialState,
	on(
		fromBoard.loadFiles,
		fromBoard.uploadFile,
		fromBoard.deleteFile,
		(state): FilesState => ({
			...state,
			status: ReqStatus.Loading,
		}),
	),

	on(fromBoard.loadFilesSuccess, (state, { files }): FilesState => {
		return filesAdapter.setAll(files, { ...state, status: ReqStatus.Success, error: null });
	}),

	on(fromBoard.uploadFileSuccess, (state, { files }): FilesState => {
		return filesAdapter.setMany(files, { ...state, status: ReqStatus.Success, error: null });
	}),

	on(fromBoard.deleteFileSuccess, (state, { fileId }): FilesState => {
		return filesAdapter.removeOne(fileId, { ...state, status: ReqStatus.Success, error: null });
	}),

	on(
		fromBoard.loadFilesError,
		fromBoard.uploadFileError,
		fromBoard.deleteFileError,
		(state, { error }): FilesState => ({
			...state,
			status: ReqStatus.Error,
			error,
		}),
	),
);
