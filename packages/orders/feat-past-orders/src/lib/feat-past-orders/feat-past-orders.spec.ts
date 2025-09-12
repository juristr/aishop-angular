import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatPastOrders } from './feat-past-orders';

describe('FeatPastOrders', () => {
  let component: FeatPastOrders;
  let fixture: ComponentFixture<FeatPastOrders>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatPastOrders],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatPastOrders);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
