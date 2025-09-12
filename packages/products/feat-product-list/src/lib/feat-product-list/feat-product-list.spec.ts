import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatProductList } from './feat-product-list';

describe('FeatProductList', () => {
  let component: FeatProductList;
  let fixture: ComponentFixture<FeatProductList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatProductList],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatProductList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
