import { TestBed } from '@angular/core/testing';
import { HomePageComponent } from './home.component';
import { Component } from '@angular/core';

@Component({
  selector: 'feat-product-list',
  standalone: true,
  template: '<div>Mock Product List</div>'
})
// eslint-disable-next-line @angular-eslint/component-selector
class MockProductListComponent {}

describe('HomePageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePageComponent],
    }).overrideComponent(HomePageComponent, {
      set: {
        imports: [MockProductListComponent]
      }
    }).compileComponents();
  });

  it('should display "Our Products" title', () => {
    const fixture = TestBed.createComponent(HomePageComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const title = compiled.querySelector('h2');
    expect(title?.textContent).toContain('Our Products');
  });
});