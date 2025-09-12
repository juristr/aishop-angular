import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiProductDetail } from './ui-product-detail';

describe('UiProductDetail', () => {
  let component: UiProductDetail;
  let fixture: ComponentFixture<UiProductDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiProductDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(UiProductDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
