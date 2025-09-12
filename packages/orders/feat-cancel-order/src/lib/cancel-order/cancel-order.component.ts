import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from '@aishop-angular/data-access-order';
import { CardComponent, ButtonComponent } from '@aishop-angular/ui';

@Component({
  selector: 'feat-cancel-order',
  standalone: true,
  imports: [CommonModule, CardComponent, ButtonComponent],
  template: `
    <ui-card title="Cancel Order">
      <div class="space-y-4">
        <p class="text-gray-700">
          Are you sure you want to cancel order #{{ order.id }}?
        </p>
        
        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p class="text-sm text-yellow-800">
            <strong>Warning:</strong> This action cannot be undone. 
            The order will be marked as cancelled and cannot be processed.
          </p>
        </div>

        <div class="flex gap-3">
          <ui-button 
            variant="danger"
            (buttonClick)="confirmCancel()"
          >
            Yes, Cancel Order
          </ui-button>
          <ui-button 
            variant="secondary"
            (buttonClick)="cancelAction()"
          >
            No, Keep Order
          </ui-button>
        </div>
      </div>
    </ui-card>
  `,
  styles: []
})
export class CancelOrderComponent {
  @Input() order!: Order;
  @Output() confirm = new EventEmitter<string>();
  @Output() cancelAction = new EventEmitter<void>();

  confirmCancel(): void {
    this.confirm.emit(this.order.id);
  }

  cancelAction(): void {
    this.cancelAction.emit();
  }
}
