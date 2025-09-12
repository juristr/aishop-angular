import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { dataAccessOrder, Order } from '@aishop-angular/data-access-order';
import { OrderDetailComponent } from '@aishop-angular/ui-order-detail';
import { CardComponent, ButtonComponent } from '@aishop-angular/ui';

@Component({
  selector: 'feat-create-order',
  standalone: true,
  imports: [CommonModule, FormsModule, OrderDetailComponent, CardComponent, ButtonComponent],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h2 class="text-2xl font-bold mb-6">Create New Order</h2>
      
      <ui-card title="Order Information">
        <form (ngSubmit)="onSubmit()" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="customerName" class="block text-sm font-medium mb-1">Customer Name</label>
              <input 
                type="text" 
                id="customerName"
                [(ngModel)]="orderData.customerName"
                name="customerName"
                required
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
            <div>
              <label for="customerEmail" class="block text-sm font-medium mb-1">Customer Email</label>
              <input 
                type="email" 
                id="customerEmail"
                [(ngModel)]="orderData.customerEmail"
                name="customerEmail"
                required
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
          </div>

          <div>
            <h3 class="font-medium mb-2">Shipping Address</h3>
            <div class="space-y-2">
              <input 
                type="text" 
                [(ngModel)]="orderData.shippingAddress.street"
                name="street"
                placeholder="Street Address"
                required
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
              <div class="grid grid-cols-3 gap-2">
                <input 
                  type="text" 
                  [(ngModel)]="orderData.shippingAddress.city"
                  name="city"
                  placeholder="City"
                  required
                  class="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                <input 
                  type="text" 
                  [(ngModel)]="orderData.shippingAddress.state"
                  name="state"
                  placeholder="State"
                  required
                  class="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                <input 
                  type="text" 
                  [(ngModel)]="orderData.shippingAddress.zipCode"
                  name="zipCode"
                  placeholder="ZIP Code"
                  required
                  class="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
              </div>
            </div>
          </div>

          <div>
            <label for="paymentMethod" class="block text-sm font-medium mb-1">Payment Method</label>
            <select 
              id="paymentMethod"
              [(ngModel)]="orderData.paymentMethod"
              name="paymentMethod"
              required
              class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="credit_card">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="bank_transfer">Bank Transfer</option>
            </select>
          </div>

          <div>
            <label for="notes" class="block text-sm font-medium mb-1">Notes (Optional)</label>
            <textarea 
              id="notes"
              [(ngModel)]="orderData.notes"
              name="notes"
              rows="3"
              class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div class="flex gap-4">
            <ui-button type="submit" variant="primary">
              Create Order
            </ui-button>
            <ui-button type="button" variant="secondary" (buttonClick)="onCancel()">
              Cancel
            </ui-button>
          </div>
        </form>
      </ui-card>

      <div *ngIf="createdOrder" class="mt-6">
        <h3 class="text-xl font-semibold mb-4">Order Created Successfully!</h3>
        <ui-order-detail [order]="createdOrder" [showActions]="false"></ui-order-detail>
      </div>
    </div>
  `,
  styles: []
})
export class CreateOrderComponent {
  private router = inject(Router);
  orderService = dataAccessOrder();
  
  orderData = {
    customerId: 'CUST-001',
    customerName: '',
    customerEmail: '',
    items: [
      { productId: 'PROD-001', productName: 'Sample Product', price: 99.99, quantity: 1 }
    ],
    shippingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'USA'
    },
    paymentMethod: 'credit_card' as const,
    notes: ''
  };

  createdOrder: Order | null = null;


  onSubmit(): void {
    const order = this.orderService.createOrder(this.orderData);
    this.createdOrder = order;
    setTimeout(() => {
      this.router.navigate(['/orders']);
    }, 2000);
  }

  onCancel(): void {
    this.router.navigate(['/orders']);
  }
}
