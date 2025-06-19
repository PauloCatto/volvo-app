import { Component, inject } from '@angular/core';
import { Bus } from '../../../core/services/models/vehicle.model';
import { VehicleDataService } from '../../../core/services/vehicle-data.service';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomDialogComponent } from '../../custom-dialog/custom-dialog.component';

@Component({
  selector: 'app-bus-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bus-detail.component.html',
  styleUrl: './bus-detail.component.scss',
})
export class BusDetailComponent {
  private vehicleService = inject(VehicleDataService);
  private themeService = inject(ThemeService);
  private dialog = inject(MatDialog);

  isDarkMode!: boolean;
  buses: Bus[] = [];

  ngOnInit(): void {
    this.getBuses();
    this.listenToThemeChanges();
  }

  getBuses(): void {
    this.vehicleService.getBuses().subscribe({
      next: (data) => {
        this.buses = data ?? [];
      },
      error: (error) => {
        this.buses = [];
        console.error(error);
      },
    });
  }

  listenToThemeChanges(): void {
    this.themeService.isDarkMode$.subscribe((mode) => {
      this.isDarkMode = mode;
    });
  }

  toggleFavorite(bus: Bus): void {
    bus.favorite = !bus.favorite;
  }

  openDetailsDialog(bus: Bus): void {
    this.dialog.open(CustomDialogComponent, {
      width: '500px',
      data: {
        title: bus?.modelName,
        message: bus?.details,
      },
    });
  }
}
