import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatCurrentOrders } from './feat-current-orders';

describe('FeatCurrentOrders', () => {
  let component: FeatCurrentOrders;
  let fixture: ComponentFixture<FeatCurrentOrders>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatCurrentOrders],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatCurrentOrders);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
