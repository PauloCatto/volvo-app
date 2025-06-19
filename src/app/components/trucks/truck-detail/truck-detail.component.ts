import { Component, inject } from '@angular/core';
import { Truck } from '../../../core/services/models/vehicle.model';
import { VehicleDataService } from '../../../core/services/vehicle-data.service';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-truck-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './truck-detail.component.html',
  styleUrl: './truck-detail.component.scss',
})
export class TruckDetailComponent {
  private vehicleService = inject(VehicleDataService);
  private themeService = inject(ThemeService);
  isDarkMode!: boolean;
  trucks: Truck[] = [];

  ngOnInit(): void {
    this.getTrucks();
    this.listenToThemeChanges();
  }

  getTrucks(): void {
    this.vehicleService.getTrucks().subscribe({
      next: (data) => {
        this.trucks = data ?? [];
      },
      error: (error) => {
        console.error(error);
        this.trucks = [];
      },
    });
  }

  listenToThemeChanges(): void {
    this.themeService.isDarkMode$.subscribe((mode) => {
      this.isDarkMode = mode;
    });
  }

  toggleFavorite(truck: Truck): void {
    truck.favorite = !truck.favorite;
  }
}
