import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogContent, DialogType } from './dialog-type';
import { CustomDialogComponent } from '../custom-dialog/custom-dialog.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let dialogMock: any;

  beforeEach(async () => {
    dialogMock = {
      open: jasmine.createSpy('open'),
    };

    await TestBed.configureTestingModule({
      imports: [FooterComponent],
      providers: [{ provide: MatDialog, useValue: dialogMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open dialog with correct data for each DialogType', () => {
    (Object.keys(DialogType) as (keyof typeof DialogType)[]).forEach((key) => {
      const type = DialogType[key];
      const expectedContent = DialogContent[type];

      component.openDialog(type);

      expect(dialogMock.open).toHaveBeenCalledWith(CustomDialogComponent, {
        width: '500px',
        data: {
          title: expectedContent.title,
          message: expectedContent.message,
        },
      });
    });
  });
});
