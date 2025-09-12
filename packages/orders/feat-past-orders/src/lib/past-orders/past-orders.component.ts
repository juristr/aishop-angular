import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { dataAccessOrder, Order } from '@aishop-angular/data-access-order';
import { OrderDetailComponent } from '@aishop-angular/ui-order-detail';

@Component({
  selector: 'feat-past-orders',
  standalone: true,
  imports: [CommonModule, OrderDetailComponent],
  template: `
    <div class="space-y-6">
      <h2 class="text-2xl font-bold">Past Orders</h2>
      
      <div *ngIf="pastOrders.length === 0" class="text-center py-12">
        <p class="text-gray-500">No past orders</p>
      </div>

      <div class="space-y-4">
        <ui-order-detail 
          *ngFor="let order of pastOrders"
          [order]="order"
          [showActions]="false"
        ></ui-order-detail>
      </div>
    </div>
  `,
  styles: []
})
export class PastOrdersComponent implements OnInit {
  orderService = dataAccessOrder();
  pastOrders: Order[] = [];

  ngOnInit(): void {
    this.loadPastOrders();
  }

  loadPastOrders(): void {
    this.pastOrders = this.orderService.getPastOrders();
  }
}
