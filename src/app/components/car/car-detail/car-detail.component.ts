import { Component, inject } from '@angular/core';
import { Car } from '../../../core/services/models/vehicle.model';
import { VehicleDataService } from '../../../core/services/vehicle-data.service';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';
import { CustomDialogComponent } from '../../custom-dialog/custom-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-car-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './car-detail.component.html',
  styleUrl: './car-detail.component.scss',
})
export class CarDetailComponent {
  private vehicleService = inject(VehicleDataService);
  private themeService = inject(ThemeService);
  private dialog = inject(MatDialog);

  isDarkMode!: boolean;
  cars: Car[] = [];

  ngOnInit(): void {
    this.getCars();
    this.listenToThemeChanges();
  }

  getCars(): void {
    this.vehicleService.getCars().subscribe({
      next: (data) => {
        this.cars = data ?? [];
      },
      error: (error) => {
        this.cars = [];
        console.log(error);
      },
    });
  }

  listenToThemeChanges(): void {
    this.themeService.isDarkMode$.subscribe((mode) => {
      this.isDarkMode = mode;
    });
  }

  toggleFavorite(car: Car): void {
    car.favorite = !car.favorite;
    this.vehicleService.updateFavorites(car);
  }

  openDetailsDialog(car: Car): void {
    this.dialog.open(CustomDialogComponent, {
      width: '500px',
      data: {
        title: car?.modelName,
        message: car?.details,
      },
    });
  }
}
