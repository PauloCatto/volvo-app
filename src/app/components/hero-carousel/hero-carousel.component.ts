import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { VehicleDataService } from '../../core/services/vehicle-data.service';
import { Launches } from '../../core/services/models/vehicle.model';

@Component({
    selector: 'app-hero-carousel',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './hero-carousel.component.html',
    styleUrl: './hero-carousel.component.scss'
})
export class HeroCarouselComponent {
  private vehicleDataService = inject(VehicleDataService);
  launches: Launches[] = [];
  currentIndex: number = 0;
  private intervalId!: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.loadLaunches();
  }

  ngOnDestroy(): void {
    this.clearAutoSlide();
  }

  loadLaunches(): void {
    this.vehicleDataService.getLaunches().subscribe({
      next: (data) => {
        this.launches = data || [];
        if (this.launches.length > 0) {
          this.startAutoSlide();
        }
      },
      error: (err) => {
        this.launches = [];
        console.error(err);
      },
    });
  }

  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.launches.length;
  }

  prev(): void {
    this.currentIndex =
      (this.currentIndex - 1 + this.launches.length) % this.launches.length;
  }

  private startAutoSlide(): void {
    this.intervalId = setInterval(() => {
      this.next();
    }, 8000); // Changes every 8 seconds
  }

  private clearAutoSlide(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
