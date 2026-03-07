import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-dialog',
  standalone: true,
  imports: [MatIconModule, MatDialogModule, MatButtonModule, CommonModule],
  templateUrl: './custom-dialog.component.html',
  styleUrls: ['./custom-dialog.component.scss'],
})
export class CustomDialogComponent {
  dialogRef = inject(MatDialogRef<CustomDialogComponent>);
  public data = inject<{ title?: string; message: string; subTitle?: string }>(MAT_DIALOG_DATA);

  close(): void {
    this.dialogRef.close();
  }
}
