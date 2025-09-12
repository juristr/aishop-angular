import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { dataAccessOrder, Order } from '@aishop-angular/data-access-order';
import { OrderDetailComponent } from '@aishop-angular/ui-order-detail';

@Component({
  selector: 'feat-current-orders',
  standalone: true,
  imports: [CommonModule, OrderDetailComponent],
  template: `
    <div class="space-y-6">
      <h2 class="text-2xl font-bold">Current Orders</h2>
      
      <div *ngIf="currentOrders.length === 0" class="text-center py-12">
        <p class="text-gray-500">No current orders</p>
      </div>

      <div class="space-y-4" data-testid="order-list">
        <ui-order-detail 
          *ngFor="let order of currentOrders"
          [order]="order"
          (cancelOrder)="handleCancelOrder($event)"
          (trackOrder)="handleTrackOrder($event)"
        ></ui-order-detail>
      </div>
    </div>
  `,
  styles: []
})
export class CurrentOrdersComponent implements OnInit {
  orderService = dataAccessOrder();
  currentOrders: Order[] = [];

  ngOnInit(): void {
    this.loadCurrentOrders();
  }

  loadCurrentOrders(): void {
    this.currentOrders = this.orderService.getRecentOrders();
  }

  handleCancelOrder(orderId: string): void {
    if (confirm('Are you sure you want to cancel this order?')) {
      const success = this.orderService.cancelOrder(orderId);
      if (success) {
        this.loadCurrentOrders();
      }
    }
  }

  handleTrackOrder(trackingNumber: string): void {
    console.log('Tracking order:', trackingNumber);
    // TODO: Implement tracking functionality
  }
}
