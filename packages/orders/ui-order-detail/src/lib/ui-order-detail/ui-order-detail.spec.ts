import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiOrderDetail } from './ui-order-detail';

describe('UiOrderDetail', () => {
  let component: UiOrderDetail;
  let fixture: ComponentFixture<UiOrderDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiOrderDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(UiOrderDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
