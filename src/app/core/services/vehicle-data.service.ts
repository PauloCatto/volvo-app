import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Bus, Car, Launches, News, Truck } from './models/vehicle.model';

@Injectable({
  providedIn: 'root',
})
export class VehicleDataService {
  private baseUrl = 'assets/data/vehicles.json';
  private storesUrl = 'assets/data/stores.json';
  private http = inject(HttpClient);

  private favoriteItemsSubject = new BehaviorSubject<(Car | Truck | Bus)[]>([]);
  favoriteItems$ = this.favoriteItemsSubject.asObservable();

  getAllVehicles(): Observable<{
    cars: Car[];
    trucks: Truck[];
    bus: Bus[];
    launches: Launches[];
  }> {
    return this.http.get<{
      cars: Car[];
      trucks: Truck[];
      bus: Bus[];
      launches: Launches[];
      recentNews: News[];
    }>(this.baseUrl);
  }

  getCars(): Observable<Car[]> {
    return this.getAllVehicles().pipe(map((data) => data.cars));
  }

  getTrucks(): Observable<Truck[]> {
    return this.getAllVehicles().pipe(map((data) => data.trucks));
  }

  getBuses(): Observable<Bus[]> {
    return this.getAllVehicles().pipe(map((data) => data.bus));
  }

  getLaunches(): Observable<Launches[]> {
    return this.getAllVehicles().pipe(map((data) => data.launches));
  }

  getRecentNews(): Observable<News[]> {
    return this.http
      .get<{ recentNews: News[] }>(this.baseUrl)
      .pipe(map((data) => data.recentNews));
  }

  getStores(): Observable<any> {
    return this.http.get<any>(this.storesUrl);
  }

  updateFavorites(item: Car | Truck | Bus): void {
    const currentFavorites = this.favoriteItemsSubject.value;
    const exists = currentFavorites.find((fav) => fav.id === item.id);

    if (item.favorite && !exists) {
      this.favoriteItemsSubject.next([...currentFavorites, item]);
    } else if (!item.favorite && exists) {
      this.favoriteItemsSubject.next(
        currentFavorites.filter((fav) => fav.id !== item.id)
      );
    }
  }
}
