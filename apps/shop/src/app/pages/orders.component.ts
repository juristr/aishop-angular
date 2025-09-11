import { Component } from '@angular/core';
import { CurrentOrdersComponent } from '@aishop-angular/orders-feat-current-orders';

@Component({
  selector: 'aishop-orders-page',
  standalone: true,
  imports: [CurrentOrdersComponent],
  template: `<aishop-current-orders />`,
  styles: []
})
export class OrdersPageComponent {}