export interface State {
	[key: string]: any;
	status: 'pending' | 'loading' | 'error' | 'success';
	error: string | null;
}
