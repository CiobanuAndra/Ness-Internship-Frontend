import { Component, Output, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-mat-confirm-dialog',
  templateUrl: './mat-confirm-dialog.component.html',
  styleUrls: ['./mat-confirm-dialog.component.scss']
})
export class MatConfirmDialogComponent {
  public dialogRef!: MatDialogRef<MatConfirmDialogComponent>
  @Output() dialogClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() {}

  closeDialog(withResult: boolean) {
    this.dialogClose.emit(withResult);
    this.dialogRef.close(withResult);
  }
}
