import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatCreateOrder } from './feat-create-order';

describe('FeatCreateOrder', () => {
  let component: FeatCreateOrder;
  let fixture: ComponentFixture<FeatCreateOrder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatCreateOrder],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatCreateOrder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
