import { Component, inject } from '@angular/core';
import { Button } from '../button/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface AlertDialogData {
  title: string;
  content?: string;
  acceptLabel?: string;
  cancelLabel?: string;
}

@Component({
  selector: 'app-alert-dialog',
  imports: [Button],
  templateUrl: './alert-dialog.html',
  styleUrl: './alert-dialog.scss',
})
export class AlertDialog {
  public dialogRef = inject(MatDialogRef<AlertDialog>);
  public data: AlertDialogData = inject(MAT_DIALOG_DATA);
}
