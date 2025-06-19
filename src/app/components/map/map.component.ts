import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import {
  GoogleMapsModule,
  MapInfoWindow,
  MapMarker,
} from '@angular/google-maps';
import { VehicleDataService } from '../../core/services/vehicle-data.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [GoogleMapsModule, CommonModule, MatSnackBarModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  private vehicleService = inject(VehicleDataService);
  private snackBar = inject(MatSnackBar);

  selectedStore: (typeof this.stores)[0] | null = null;
  center = { lat: -14.235, lng: -51.9253 };
  zoom = 0;
  google: typeof google = (window as any).google;
  stores: any[] = [];

  currentPosition: google.maps.LatLngLiteral | null = null;

  directionsRenderer = new google.maps.DirectionsRenderer();
  directionsService = new google.maps.DirectionsService();

  ngOnInit() {
    this.getStores();
    this.getUserLocation();
  }

  getStores(): void {
    this.vehicleService.getStores().subscribe({
      next: (data) => {
        this.stores = data ?? [];
      },
      error: (error) => {
        this.stores = [];
        this.showMessage('Failed to load stores. Please try again later.');
        console.error(error);
      },
    });
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.center = this.currentPosition;
          this.zoom = 7;
        },
        (error) => {
          this.showMessage('Unable to get your location.');
          console.error(error);
        }
      );
    } else {
      this.showMessage('Geolocation is not supported by your browser.');
    }
  }

  openInfo(store: (typeof this.stores)[0], marker: MapMarker) {
    this.selectedStore = store;
    this.infoWindow.open(marker);
  }

  closeInfo() {
    this.infoWindow.close();
  }

  onMarkerClick(store: { lat: number; lng: number }) {
    if (!this.currentPosition) {
      this.showMessage('Unable to get your current location.');
      return;
    }

    const request: google.maps.DirectionsRequest = {
      origin: this.currentPosition,
      destination: { lat: store.lat, lng: store.lng },
      travelMode: google.maps.TravelMode.DRIVING,
    };

    this.directionsService.route(request, (result, status) => {
      if (status === 'OK' && result) {
        this.directionsRenderer.setDirections(result);
      } else {
        this.showMessage(`Unable to draw route: ${status}`);
      }
    });
  }

  mapReady(event: google.maps.Map | Event) {
    const map = event as google.maps.Map;
    this.directionsRenderer.setMap(map);
  }

  private showMessage(message: string, action = 'Close', duration = 4000) {
    this.snackBar.open(message, action, {
      duration,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
