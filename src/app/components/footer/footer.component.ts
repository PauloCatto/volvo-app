import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CustomDialogComponent } from '../custom-dialog/custom-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogContent, DialogType } from './dialog-type';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  DialogType = DialogType;
  private dialog = inject(MatDialog);

  openDialog(type: DialogType): void {
    const { title, message } = DialogContent[type];

    this.dialog.open(CustomDialogComponent, {
      width: '500px',
      data: { title, message }
    });
  }
}
