import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import {
  GoogleMapsModule,
  MapInfoWindow,
  MapMarker,
} from '@angular/google-maps';
import { VehicleDataService } from '../../core/services/vehicle-data.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CustomDialogComponent } from '../custom-dialog/custom-dialog.component'; // Ajuste o caminho se necessário

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    GoogleMapsModule,
    CommonModule,
    MatSnackBarModule,
    MatDialogModule,
    NgIf,
  ],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  private vehicleService = inject(VehicleDataService);
  private dialog = inject(MatDialog);

  selectedStore: any = null;
  center = { lat: -14.235, lng: -51.9253 };
  zoom = 4;
  stores: any[] = [];
  currentPosition: google.maps.LatLngLiteral | null = null;
  locationPermissionDenied = false;

  directionsRenderer!: google.maps.DirectionsRenderer;
  directionsService!: google.maps.DirectionsService;
  markerIcon: any;

  ngOnInit() {
    this.loadGoogleMapsObjects();
    this.getStores();
    this.checkInitialLocation();
  }

  loadGoogleMapsObjects(): void {
    if (window.google && window.google.maps) {
      this.initGoogleObjects();
    } else {
      const interval = setInterval(() => {
        if (window.google && window.google.maps) {
          clearInterval(interval);
          this.initGoogleObjects();
        }
      }, 100);
    }
  }

  initGoogleObjects(): void {
    this.directionsRenderer = new window.google.maps.DirectionsRenderer();
    this.directionsService = new window.google.maps.DirectionsService();
    this.markerIcon = {
      path: window.google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
      scale: 8,
      fillColor: 'blue',
      fillOpacity: 1,
      strokeWeight: 1,
    };
  }

  getStores(): void {
    this.vehicleService.getStores().subscribe({
      next: (data) => {
        this.stores = data ?? [];
      },
      error: (error) => {
        this.stores = [];
        console.error(error);
      },
    });
  }

  checkInitialLocation(): void {
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
          console.error(error);
          if (error.code === error.PERMISSION_DENIED) {
            this.locationPermissionDenied = true;
          }
        }
      );
    } else {
      this.locationPermissionDenied = true;
    }
  }

  updateUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          window.location.reload();
        },
        (error) => {
          console.error(error);
          if (error.code === error.PERMISSION_DENIED) {
            this.dialog.open(CustomDialogComponent, {
              data: {
                title: 'Location Permission Denied',
                message:
                  'You denied location permission. Please click the location icon near the address bar of your browser to enable it manually.',
              },
            });
          } else {
            this.dialog.open(CustomDialogComponent, {
              data: {
                title: 'Error',
                message: 'Unable to get your location. Please try again.',
              },
            });
          }
        }
      );
    } else {
      this.dialog.open(CustomDialogComponent, {
        data: {
          title: 'Geolocation Not Supported',
          message: 'Your browser does not support geolocation.',
        },
      });
    }
  }

  openInfo(store: any, marker: MapMarker): void {
    this.selectedStore = store;
    this.infoWindow.open(marker);
  }

  closeInfo(): void {
    this.infoWindow.close();
  }

  onMarkerClick(store: { lat: number; lng: number }): void {
    if (
      !this.currentPosition ||
      !this.directionsService ||
      !this.directionsRenderer
    ) {
      return;
    }

    const request: google.maps.DirectionsRequest = {
      origin: this.currentPosition,
      destination: { lat: store.lat, lng: store.lng },
      travelMode: window.google.maps.TravelMode.DRIVING,
    };

    this.directionsService.route(request, (result, status) => {
      if (status === 'OK' && result) {
        this.directionsRenderer.setDirections(result);
      }
    });
  }

  mapReady(event: google.maps.Map | Event): void {
    if (this.directionsRenderer) {
      const map = event as google.maps.Map;
      this.directionsRenderer.setMap(map);
    }
  }
}
