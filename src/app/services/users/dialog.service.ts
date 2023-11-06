import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatConfirmDialogComponent } from 'src/app/users/dialog/mat-confirm-dialog/mat-confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmationDialog(): Promise<boolean> {
    const dialogRef = this.dialog.open(MatConfirmDialogComponent, {
      width: '26.563rem',
      height: '11.25rem',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
    });

    return dialogRef.afterClosed().toPromise();
  }
}
