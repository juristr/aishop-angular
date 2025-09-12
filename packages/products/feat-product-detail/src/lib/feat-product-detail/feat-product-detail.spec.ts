import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatProductDetail } from './feat-product-detail';

describe('FeatProductDetail', () => {
  let component: FeatProductDetail;
  let fixture: ComponentFixture<FeatProductDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatProductDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatProductDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
