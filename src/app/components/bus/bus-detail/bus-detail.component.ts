import { Component, inject } from '@angular/core';
import { Bus } from '../../../core/services/models/vehicle.model';
import { VehicleDataService } from '../../../core/services/vehicle-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bus-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bus-detail.component.html',
  styleUrl: './bus-detail.component.scss',
})
export class BusDetailComponent {
  private vehicleService = inject(VehicleDataService);
  buses: Bus[] = [];

  ngOnInit(): void {
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
}
