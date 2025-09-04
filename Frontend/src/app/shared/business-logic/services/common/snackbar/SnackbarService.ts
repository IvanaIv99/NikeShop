import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) {}

  public showSuccess(message: string, action: string = 'Close', duration: number = 3000): void {
    this.snackBar.open(message, action, {
      duration,
      panelClass: ['success-snackbar']
    });
  }

  public showError(message: string, action: string = 'Close', duration: number = 3000): void {
    this.snackBar.open(message, action, {
      duration,
      panelClass: ['error-snackbar'],
    });
  }

  public showInfo(message: string, action: string = 'Close', duration: number = 3000): void {
    this.snackBar.open(message, action, {
      duration,
      panelClass: ['info-snackbar'],
    });
  }
}
