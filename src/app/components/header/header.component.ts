import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isDarkMode = false;
  isFavorited = false;

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  toggleFavorites(): void {
    this.isFavorited = !this.isFavorited;
    // Aqui você pode abrir um modal, um painel lateral, ou fazer outra ação com os favoritos
    console.log('Favorites toggled:', this.isFavorited);
  }
}
