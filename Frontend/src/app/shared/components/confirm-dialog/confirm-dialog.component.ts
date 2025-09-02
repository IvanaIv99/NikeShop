// confirm-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {SharedModule} from "../../shared.module";

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [
    SharedModule
  ],
  template: `
    <h2 mat-dialog-title>Confirm</h2>
    <mat-dialog-content>
      {{ data.message }}
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="false">Cancel</button>
      <button mat-button color="warn" [mat-dialog-close]="true">Yes</button>
    </mat-dialog-actions>
  `
})
export class ConfirmDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {}
}
