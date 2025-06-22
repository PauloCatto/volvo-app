import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { NewsComponent } from './news.component';
import { VehicleDataService } from '../../core/services/vehicle-data.service';

describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;

  const mockNews = [
    {
      id: '1',
      title: 'News 1',
      content: 'Content 1',
      tag: 'tag1',
      date: '2024-01-01',
      description: 'Description 1',
      image: 'image1.jpg',
    },
    {
      id: '2',
      title: 'News 2',
      content: 'Content 2',
      tag: 'tag2',
      date: '2024-01-02',
      description: 'Description 2',
      image: 'image2.jpg',
    },
  ];

  const vehicleDataServiceMock = {
    getRecentNews: jasmine.createSpy('getRecentNews'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsComponent, HttpClientTestingModule],
      providers: [
        { provide: VehicleDataService, useValue: vehicleDataServiceMock }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NewsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    vehicleDataServiceMock.getRecentNews.and.returnValue(of([]));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load recent news successfully', () => {
    vehicleDataServiceMock.getRecentNews.and.returnValue(of(mockNews));
    fixture.detectChanges();

    expect(component.recentNews.length).toBe(2);
    expect(component.recentNews).toEqual(mockNews);
  });

  it('should handle error when loading news', () => {
    vehicleDataServiceMock.getRecentNews.and.returnValue(throwError(() => new Error('fail')));
    spyOn(console, 'error');
    fixture.detectChanges();

    expect(component.recentNews).toEqual([]);
    expect(console.error).toHaveBeenCalled();
  });
});
