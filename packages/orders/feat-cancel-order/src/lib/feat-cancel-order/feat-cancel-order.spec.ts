import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatCancelOrder } from './feat-cancel-order';

describe('FeatCancelOrder', () => {
  let component: FeatCancelOrder;
  let fixture: ComponentFixture<FeatCancelOrder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatCancelOrder],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatCancelOrder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
