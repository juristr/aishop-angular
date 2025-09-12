import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [type]="type"
      [disabled]="disabled"
      [ngClass]="buttonClasses"
      (click)="handleClick($event)"
      class="px-4 py-2 font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
    >
      <ng-content></ng-content>
    </button>
  `,
  styles: []
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'danger' | 'ghost' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() fullWidth = false;
  @Output() buttonClick = new EventEmitter<MouseEvent>();

  get buttonClasses(): string {
    const baseClasses = [];
    
    // Variant classes
    switch (this.variant) {
      case 'primary':
        baseClasses.push('bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500');
        break;
      case 'secondary':
        baseClasses.push('bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500');
        break;
      case 'danger':
        baseClasses.push('bg-red-600 text-white hover:bg-red-700 focus:ring-red-500');
        break;
      case 'ghost':
        baseClasses.push('bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500');
        break;
    }
    
    // Size classes
    switch (this.size) {
      case 'sm':
        baseClasses.push('text-sm px-3 py-1.5');
        break;
      case 'md':
        baseClasses.push('text-base px-4 py-2');
        break;
      case 'lg':
        baseClasses.push('text-lg px-6 py-3');
        break;
    }
    
    // Width classes
    if (this.fullWidth) {
      baseClasses.push('w-full');
    }
    
    // Disabled classes
    if (this.disabled) {
      baseClasses.push('opacity-50 cursor-not-allowed');
    }
    
    return baseClasses.join(' ');
  }

  handleClick(event: MouseEvent): void {
    if (!this.disabled) {
      this.buttonClick.emit(event);
    }
  }
}