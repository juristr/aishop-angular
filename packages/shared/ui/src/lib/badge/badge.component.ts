import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span
      [ngClass]="badgeClasses"
      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
    >
      <ng-content></ng-content>
    </span>
  `,
  styles: []
})
export class BadgeComponent {
  @Input() variant: 'default' | 'success' | 'warning' | 'danger' | 'info' = 'default';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  get badgeClasses(): string {
    const classes = [];
    
    // Variant classes
    switch (this.variant) {
      case 'default':
        classes.push('bg-gray-100 text-gray-800');
        break;
      case 'success':
        classes.push('bg-green-100 text-green-800');
        break;
      case 'warning':
        classes.push('bg-yellow-100 text-yellow-800');
        break;
      case 'danger':
        classes.push('bg-red-100 text-red-800');
        break;
      case 'info':
        classes.push('bg-blue-100 text-blue-800');
        break;
    }
    
    // Size classes
    switch (this.size) {
      case 'sm':
        classes.push('text-xs px-2 py-0.5');
        break;
      case 'md':
        classes.push('text-sm px-2.5 py-0.5');
        break;
      case 'lg':
        classes.push('text-base px-3 py-1');
        break;
    }
    
    return classes.join(' ');
  }
}