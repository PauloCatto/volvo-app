import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryCardsComponent } from './category-cards.component';
import { Router } from '@angular/router';
import { ThemeService } from '../../core/services/theme.service';
import { Subject } from 'rxjs';

describe('CategoryCardsComponent', () => {
  let component: CategoryCardsComponent;
  let fixture: ComponentFixture<CategoryCardsComponent>;

  let routerMock: any;
  let themeServiceMock: any;

  beforeEach(async () => {
    routerMock = {
      navigate: jasmine.createSpy('navigate'),
    };

    themeServiceMock = {
      isDarkMode$: new Subject<boolean>(),
    };

    await TestBed.configureTestingModule({
      imports: [CategoryCardsComponent],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: ThemeService, useValue: themeServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryCardsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to correct category', () => {
    const category = 'cars';
    component.navigateTo(category);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/' + category]);
  });

  it('should listen to theme changes and update isDarkMode', () => {
    component.listenToThemeChanges();

    themeServiceMock.isDarkMode$.next(true);
    expect(component.isDarkMode).toBeTrue();

    themeServiceMock.isDarkMode$.next(false);
    expect(component.isDarkMode).toBeFalse();
  });
});
