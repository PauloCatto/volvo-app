import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { VehicleDataService } from './vehicle-data.service';
import { Car } from './models/vehicle.model';

describe('VehicleDataService', () => {
  let service: VehicleDataService;
  let httpMock: HttpTestingController;

  const mockData = {
    cars: [{ id: '1', modelName: 'Car 1', imageUrl: '', favorite: false }],
    trucks: [{ id: '2', modelName: 'Truck 1', imageUrl: '', favorite: false }],
    bus: [{ id: '3', modelName: 'Bus 1', imageUrl: '', favorite: false }],
    launches: [{ id: '4', modelName: 'Launch 1', imageUrl: '' }],
    recentNews: [
      {
        id: 'n1',
        title: 'News 1',
        content: 'Content 1',
        tag: 'tag1',
        date: '2024-01-01',
        description: 'Desc 1',
        image: 'image1.jpg',
      },
    ],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(VehicleDataService);
    httpMock = TestBed.inject(HttpTestingController);

    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all vehicles', () => {
    service.getAllVehicles().subscribe((data) => {
      expect(data.cars.length).toBe(1);
      expect(data.trucks.length).toBe(1);
      expect(data.bus.length).toBe(1);
      expect(data.launches.length).toBe(1);
    });

    const req = httpMock.expectOne('assets/data/vehicles.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch cars only', () => {
    service.getCars().subscribe((cars) => {
      expect(cars.length).toBe(1);
      expect(cars[0].modelName).toBe('Car 1');
    });

    const req = httpMock.expectOne('assets/data/vehicles.json');
    req.flush(mockData);
  });

  it('should fetch trucks only', () => {
    service.getTrucks().subscribe((trucks) => {
      expect(trucks.length).toBe(1);
      expect(trucks[0].modelName).toBe('Truck 1');
    });

    const req = httpMock.expectOne('assets/data/vehicles.json');
    req.flush(mockData);
  });

  it('should fetch buses only', () => {
    service.getBuses().subscribe((buses) => {
      expect(buses.length).toBe(1);
      expect(buses[0].modelName).toBe('Bus 1');
    });

    const req = httpMock.expectOne('assets/data/vehicles.json');
    req.flush(mockData);
  });

  it('should fetch launches only', () => {
    service.getLaunches().subscribe((launches) => {
      expect(launches.length).toBe(1);
      expect(launches[0].modelName).toBe('Launch 1');
    });

    const req = httpMock.expectOne('assets/data/vehicles.json');
    req.flush(mockData);
  });

  it('should fetch recent news', () => {
    service.getRecentNews().subscribe((news) => {
      expect(news.length).toBe(1);
      expect(news[0].title).toBe('News 1');
    });

    const req = httpMock.expectOne('assets/data/vehicles.json');
    req.flush(mockData);
  });

  it('should load favorites from localStorage', () => {
    const favs = [{ id: '1', modelName: 'Car 1', favorite: true }];
    localStorage.setItem('favoriteVehicles', JSON.stringify(favs));

    service.loadFavorites();

    service.favoriteItems$.subscribe((favorites) => {
      expect(favorites.length).toBe(1);
      expect(favorites[0].id).toBe('1');
      expect(favorites[0].favorite).toBeTrue();
    });
  });

  it('should add a favorite item', () => {
    const car = { id: '1', modelName: 'Car 1', favorite: true } as Car;

    service.updateFavorites(car);

    service.favoriteItems$.subscribe((favorites) => {
      expect(favorites.length).toBe(1);
      expect(favorites[0].id).toBe('1');
      expect(favorites[0].favorite).toBeTrue();
    });

    const stored = JSON.parse(localStorage.getItem('favoriteVehicles')!);
    expect(stored.length).toBe(1);
  });

  it('should remove a favorite item', () => {
    const car = { id: '1', modelName: 'Car 1', favorite: true } as Car;

    service.updateFavorites(car);

    car.favorite = false;
    service.updateFavorites(car);

    service.favoriteItems$.subscribe((favorites) => {
      expect(favorites.length).toBe(0);
    });

    const stored = JSON.parse(localStorage.getItem('favoriteVehicles')!);
    expect(stored.length).toBe(0);
  });
});
