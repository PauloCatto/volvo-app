import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-category-cards',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './category-cards.component.html',
  styleUrl: './category-cards.component.scss',
})
export class CategoryCardsComponent {
  private router = inject(Router);
  private themeService = inject(ThemeService);
  isDarkMode!: boolean;

  ngOnInit(): void {
    this.listenToThemeChanges();
  }

  navigateTo(category: string): void {
    this.router.navigate(['/' + category]);
  }

  listenToThemeChanges(): void {
    this.themeService.isDarkMode$.subscribe((mode) => {
      this.isDarkMode = mode;
    });
  }
}
