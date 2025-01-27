import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ToastMessage } from '../types/toast.messages';

@Injectable({
	providedIn: 'root',
})

export class ToastService {
	private horizontalPosition: MatSnackBarHorizontalPosition = 'right';
	private verticalPosition: MatSnackBarVerticalPosition = 'top';
	private toast = inject(MatSnackBar);

	public showToast(toastMessage: ToastMessage) {
		this.toast.open(toastMessage.content, toastMessage.status, {
			horizontalPosition: this.horizontalPosition,
			verticalPosition: this.verticalPosition,
			duration: 3000,
		});
	}
}