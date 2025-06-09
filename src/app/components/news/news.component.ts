import { Component, inject, OnInit } from '@angular/core';
import { News } from '../../core/services/models/vehicle.model';
import { VehicleDataService } from '../../core/services/vehicle-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss',
})
export class NewsComponent implements OnInit {
  recentNews: News[] = [];

  private vehicleDataService = inject(VehicleDataService);

  ngOnInit(): void {
    this.loadNews();
  }

  loadNews(): void {
    this.vehicleDataService.getRecentNews().subscribe({
      next: (news) => {
        this.recentNews = news || [];
      },
      error: (err) => {
        console.error(err);
        this.recentNews = [];
      },
    });
  }
}
