import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      [ngClass]="cardClasses"
      class="bg-white rounded-lg shadow-sm overflow-hidden"
    >
      <div *ngIf="title || subtitle" class="px-6 py-4 border-b border-gray-200">
        <h3 *ngIf="title" class="text-lg font-semibold text-gray-900">{{ title }}</h3>
        <p *ngIf="subtitle" class="mt-1 text-sm text-gray-600">{{ subtitle }}</p>
      </div>
      <div [ngClass]="contentClasses">
        <ng-content></ng-content>
      </div>
      <div *ngIf="hasFooter" class="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <ng-content select="[card-footer]"></ng-content>
      </div>
    </div>
  `,
  styles: []
})
export class CardComponent {
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() noPadding = false;
  @Input() hasFooter = false;
  @Input() hoverable = false;

  get cardClasses(): string {
    const classes = [];
    
    if (this.hoverable) {
      classes.push('hover:shadow-lg transition-shadow duration-200 cursor-pointer');
    }
    
    return classes.join(' ');
  }

  get contentClasses(): string {
    return this.noPadding ? '' : 'p-6';
  }
}