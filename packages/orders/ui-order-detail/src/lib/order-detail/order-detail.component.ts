import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from '@aishop-angular/data-access-order';
import { CardComponent, BadgeComponent, ButtonComponent } from '@aishop-angular/ui';
import { formatCurrency, formatDate } from '@aishop-angular/utils';

@Component({
  selector: 'ui-order-detail',
  standalone: true,
  imports: [CommonModule, CardComponent, BadgeComponent, ButtonComponent],
  template: `
    <ui-card [title]="'Order #' + order.id" data-testid="order-card">
      <div class="space-y-6">
        <!-- Order Status -->
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Status</p>
            <ui-badge [variant]="getStatusVariant(order.status)" data-testid="order-status">
              {{ getStatusLabel(order.status) }}
            </ui-badge>
          </div>
          <div class="text-right">
            <p class="text-sm text-gray-600">Order Date</p>
            <p class="font-medium" data-testid="order-date">{{ formatDate(order.orderDate) }}</p>
          </div>
          <div class="hidden">
            <span data-testid="order-id">{{ order.id }}</span>
          </div>
        </div>

        <!-- Customer Information -->
        <div>
          <h4 class="text-sm font-medium text-gray-900 mb-2">Customer Information</h4>
          <div class="bg-gray-50 rounded-lg p-4">
            <p class="text-sm" data-testid="order-customer"><span class="font-medium">Name:</span> {{ order.customerName }}</p>
            <p class="text-sm mt-1"><span class="font-medium">Email:</span> {{ order.customerEmail }}</p>
          </div>
        </div>

        <!-- Shipping Address -->
        <div>
          <h4 class="text-sm font-medium text-gray-900 mb-2">Shipping Address</h4>
          <div class="bg-gray-50 rounded-lg p-4">
            <p class="text-sm">{{ order.shippingAddress.street }}</p>
            <p class="text-sm">{{ order.shippingAddress.city }}, {{ order.shippingAddress.state }} {{ order.shippingAddress.zipCode }}</p>
            <p class="text-sm">{{ order.shippingAddress.country }}</p>
          </div>
        </div>

        <!-- Order Items -->
        <div data-testid="order-items">
          <h4 class="text-sm font-medium text-gray-900 mb-2">Order Items</h4>
          <div class="bg-gray-50 rounded-lg overflow-hidden">
            <table class="min-w-full">
              <thead class="bg-gray-100">
                <tr>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-700">Product</th>
                  <th class="px-4 py-2 text-center text-xs font-medium text-gray-700">Qty</th>
                  <th class="px-4 py-2 text-right text-xs font-medium text-gray-700">Price</th>
                  <th class="px-4 py-2 text-right text-xs font-medium text-gray-700">Subtotal</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr *ngFor="let item of order.items">
                  <td class="px-4 py-3 text-sm">{{ item.productName }}</td>
                  <td class="px-4 py-3 text-sm text-center">{{ item.quantity }}</td>
                  <td class="px-4 py-3 text-sm text-right">{{ formatCurrency(item.price) }}</td>
                  <td class="px-4 py-3 text-sm text-right font-medium">{{ formatCurrency(item.subtotal) }}</td>
                </tr>
              </tbody>
              <tfoot class="bg-gray-100">
                <tr>
                  <td colspan="3" class="px-4 py-2 text-right text-sm font-medium">Total:</td>
                  <td class="px-4 py-2 text-right text-lg font-bold text-gray-900" data-testid="order-total">
                    {{ formatCurrency(order.totalAmount) }}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <!-- Additional Information -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="text-sm text-gray-600">Payment Method</p>
            <p class="font-medium capitalize">{{ order.paymentMethod.replace('_', ' ') }}</p>
          </div>
          <div *ngIf="order.trackingNumber">
            <p class="text-sm text-gray-600">Tracking Number</p>
            <p class="font-medium">{{ order.trackingNumber }}</p>
          </div>
        </div>

        <!-- Notes -->
        <div *ngIf="order.notes">
          <h4 class="text-sm font-medium text-gray-900 mb-2">Notes</h4>
          <div class="bg-gray-50 rounded-lg p-4">
            <p class="text-sm text-gray-700">{{ order.notes }}</p>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex gap-3" *ngIf="showActions">
          <ui-button 
            *ngIf="canCancel()"
            variant="danger"
            (buttonClick)="onCancelOrder()"
            data-testid="cancel-order-btn"
          >
            Cancel Order
          </ui-button>
          <ui-button 
            *ngIf="canTrack()"
            variant="primary"
            (buttonClick)="onTrackOrder()"
          >
            Track Order
          </ui-button>
        </div>
      </div>
    </ui-card>
  `,
  styles: []
})
export class OrderDetailComponent {
  @Input() order!: Order;
  @Input() showActions = true;
  @Output() cancelOrder = new EventEmitter<string>();
  @Output() trackOrder = new EventEmitter<string>();

  formatCurrency = formatCurrency;
  formatDate = formatDate;

  getStatusVariant(status: Order['status']): 'success' | 'warning' | 'danger' | 'info' | 'default' {
    switch (status) {
      case 'delivered':
        return 'success';
      case 'shipped':
        return 'info';
      case 'processing':
        return 'warning';
      case 'cancelled':
        return 'danger';
      default:
        return 'default';
    }
  }

  getStatusLabel(status: Order['status']): string {
    return status.charAt(0).toUpperCase() + status.slice(1);
  }

  canCancel(): boolean {
    return this.order.status === 'pending' || this.order.status === 'processing';
  }

  canTrack(): boolean {
    return this.order.status === 'shipped' && !!this.order.trackingNumber;
  }

  onCancelOrder(): void {
    this.cancelOrder.emit(this.order.id);
  }

  onTrackOrder(): void {
    this.trackOrder.emit(this.order.trackingNumber);
  }
}