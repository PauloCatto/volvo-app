import { Component, inject } from '@angular/core';
import { Truck } from '../../../core/services/models/vehicle.model';
import { VehicleDataService } from '../../../core/services/vehicle-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-truck-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './truck-detail.component.html',
  styleUrl: './truck-detail.component.scss',
})
export class TruckDetailComponent {
  private vehicleService = inject(VehicleDataService);
  trucks: Truck[] = [];

  ngOnInit(): void {
    this.vehicleService.getTrucks().subscribe({
      next: (data) => {
        this.trucks = data ?? [];
      },
      error: (error) => {
        console.log(error);
        this.trucks = [];
      },
    });
  }
}
