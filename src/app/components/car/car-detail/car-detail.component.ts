import { Component, inject } from '@angular/core';
import { Car } from '../../../core/services/models/vehicle.model';
import { VehicleDataService } from '../../../core/services/vehicle-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-car-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './car-detail.component.html',
  styleUrl: './car-detail.component.scss',
})
export class CarDetailComponent {
  private vehicleService = inject(VehicleDataService);
  cars: Car[] = [];

  ngOnInit(): void {
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

  toggleFavorite(car: Car): void {
    car.favorite = !car.favorite;
  }
}
