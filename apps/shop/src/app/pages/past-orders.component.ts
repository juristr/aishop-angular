import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PastOrdersComponent } from '@aishop-angular/feat-past-orders';

@Component({
  selector: 'aishop-past-orders-page',
  standalone: true,
  imports: [CommonModule, PastOrdersComponent],
  template: `<feat-past-orders />`,
  styles: [],
})
export class PastOrdersPageComponent {}
