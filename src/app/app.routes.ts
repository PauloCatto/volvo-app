import { Routes } from '@angular/router';
import { BusDetailComponent } from './components/bus/bus-detail/bus-detail.component';
import { CarDetailComponent } from './components/car/car-detail/car-detail.component';
import { TruckDetailComponent } from './components/trucks/truck-detail/truck-detail.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'trucks', component: TruckDetailComponent },
  { path: 'bus', component: BusDetailComponent },
  { path: 'cars', component: CarDetailComponent },
];
