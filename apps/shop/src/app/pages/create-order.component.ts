import { Component } from '@angular/core';
import { FeatCreateOrderComponent } from '@aishop-angular/feat-create-order';

@Component({
  selector: 'aishop-create-order-page',
  standalone: true,
  imports: [FeatCreateOrderComponent],
  template: `<aishop-feat-create-order />`,
  styles: []
})
export class CreateOrderPageComponent {}