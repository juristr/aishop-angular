import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from '@aishop-angular/feat-product-list';

@Component({
  selector: 'aishop-home-page',
  standalone: true,
  imports: [CommonModule, ProductListComponent],
  template: `
    <section class="mb-8">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-800">Our Products</h2>
      </div>
      <feat-product-list />
    </section>
  `,
  styles: [],
})
export class HomePageComponent {}
