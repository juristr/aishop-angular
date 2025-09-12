import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentOrdersComponent } from '@aishop-angular/feat-current-orders';

@Component({
  selector: 'aishop-orders-page',
  standalone: true,
  imports: [CommonModule, CurrentOrdersComponent],
  template: `
    <div class="container mx-auto px-4 py-8">
      <feat-current-orders />
    </div>
  `,
  styles: [],
})
export class OrdersPageComponent {}
