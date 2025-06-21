import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-custom-dialog',
  imports: [MatIconModule],
  templateUrl: './custom-dialog.component.html',
  styleUrls: ['./custom-dialog.component.scss'],
})
export class CustomDialogComponent {
  dialogRef = inject(MatDialogRef<CustomDialogComponent>);
  data = inject<{ title?: string; message: string }>(MAT_DIALOG_DATA);

  close(): void {
    this.dialogRef.close();
  }
}
