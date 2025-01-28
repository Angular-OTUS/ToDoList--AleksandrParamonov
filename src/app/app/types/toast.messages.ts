export interface ToastMessage {
	status: string;
	content: string;
}

export const ToastMessages = {
	success: {
		status: 'success',
		content: 'Todo was added!',
	},
	deleted: {
		status: 'deleted',
		content: 'Todo was deleted!',
	},
	update: {
		status: 'update',
		content: 'Todo was edited!',
	},
	error: {
		status: 'error',
		content: 'An error has occurred!',
	},
};