import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateOrderComponent } from '@aishop-angular/feat-create-order';

@Component({
  selector: 'aishop-create-order-page',
  standalone: true,
  imports: [CommonModule, CreateOrderComponent],
  template: `<feat-create-order />`,
  styles: [],
})
export class CreateOrderPageComponent {}
