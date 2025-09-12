import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '@aishop-angular/data-access-products';
import { CardComponent, BadgeComponent, ButtonComponent } from '@aishop-angular/ui';
import { formatCurrency } from '@aishop-angular/utils';

@Component({
  selector: 'ui-product-detail',
  standalone: true,
  imports: [CommonModule, CardComponent, BadgeComponent, ButtonComponent],
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Product Image -->
      <div class="space-y-4">
        <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden">
          <img 
            [src]="product.images[0] || '/api/placeholder/600/600'" 
            [alt]="product.name"
            class="w-full h-full object-cover"
          >
        </div>
        <div class="grid grid-cols-4 gap-2" *ngIf="product.images.length > 1">
          <div 
            *ngFor="let image of product.images.slice(1, 5)" 
            class="aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-75"
          >
            <img [src]="image" [alt]="product.name" class="w-full h-full object-cover">
          </div>
        </div>
      </div>

      <!-- Product Information -->
      <div class="space-y-6">
        <!-- Title and Badges -->
        <div>
          <div class="flex items-start justify-between mb-2">
            <h1 class="text-3xl font-bold text-gray-900">{{ product.name }}</h1>
            <div class="flex gap-2">
              <ui-badge *ngIf="product.isNew" variant="info">New</ui-badge>
              <ui-badge *ngIf="product.isFeatured" variant="warning">Featured</ui-badge>
            </div>
          </div>
          <p class="text-gray-600">{{ product.description }}</p>
        </div>

        <!-- Price and Stock -->
        <div class="border-t border-b py-4">
          <div class="flex items-center justify-between mb-4">
            <div>
              <div class="flex items-baseline gap-2">
                <span class="text-3xl font-bold text-gray-900">
                  {{ formatCurrency(getDiscountedPrice()) }}
                </span>
                <span *ngIf="product.discount" class="text-xl text-gray-500 line-through">
                  {{ formatCurrency(product.price) }}
                </span>
              </div>
              <ui-badge *ngIf="product.discount" variant="danger" size="sm">
                {{ product.discount }}% OFF
              </ui-badge>
            </div>
            <div class="text-right">
              <ui-badge [variant]="product.inStock ? 'success' : 'danger'">
                {{ product.inStock ? 'In Stock' : 'Out of Stock' }}
              </ui-badge>
              <p *ngIf="product.inStock" class="text-sm text-gray-600 mt-1">
                {{ product.stockQuantity }} available
              </p>
            </div>
          </div>

          <!-- Rating -->
          <div class="flex items-center gap-2">
            <div class="flex">
              <span *ngFor="let star of [1,2,3,4,5]" 
                    class="text-yellow-400"
                    [class.text-gray-300]="star > product.rating">
                ★
              </span>
            </div>
            <span class="text-sm text-gray-600">
              {{ product.rating }} ({{ product.reviewCount }} reviews)
            </span>
          </div>
        </div>

        <!-- Product Details -->
        <div>
          <div class="flex items-center gap-4 text-sm">
            <span class="text-gray-600">Brand:</span>
            <span class="font-medium">{{ product.brand }}</span>
          </div>
          <div class="flex items-center gap-4 text-sm mt-2">
            <span class="text-gray-600">SKU:</span>
            <span class="font-medium">{{ product.sku }}</span>
          </div>
          <div class="flex items-center gap-4 text-sm mt-2">
            <span class="text-gray-600">Category:</span>
            <span class="font-medium capitalize">{{ product.category }}</span>
          </div>
        </div>

        <!-- Features -->
        <div *ngIf="product.features.length > 0">
          <h3 class="text-lg font-semibold mb-3">Key Features</h3>
          <ul class="space-y-2">
            <li *ngFor="let feature of product.features" class="flex items-start">
              <span class="text-green-500 mr-2">✓</span>
              <span class="text-gray-700">{{ feature }}</span>
            </li>
          </ul>
        </div>

        <!-- Add to Cart -->
        <div class="flex items-center gap-4">
          <div class="flex items-center border rounded-lg">
            <button 
              (click)="decrementQuantity()"
              class="px-4 py-2 hover:bg-gray-100 transition-colors"
              [disabled]="quantity <= 1"
            >
              -
            </button>
            <span class="px-4 py-2 font-medium">{{ quantity }}</span>
            <button 
              (click)="incrementQuantity()"
              class="px-4 py-2 hover:bg-gray-100 transition-colors"
              [disabled]="quantity >= product.stockQuantity"
            >
              +
            </button>
          </div>
          <ui-button 
            variant="primary"
            size="lg"
            [fullWidth]="true"
            [disabled]="!product.inStock"
            (buttonClick)="onAddToCart()"
          >
            Add to Cart
          </ui-button>
        </div>

        <!-- Specifications -->
        <ui-card *ngIf="hasSpecifications()" title="Specifications" [noPadding]="true">
          <div class="divide-y">
            <div *ngFor="let spec of getSpecifications()" class="px-4 py-3 flex justify-between">
              <span class="text-gray-600">{{ spec.key }}</span>
              <span class="font-medium">{{ spec.value }}</span>
            </div>
          </div>
        </ui-card>

        <!-- Tags -->
        <div *ngIf="product.tags.length > 0" class="flex flex-wrap gap-2">
          <ui-badge *ngFor="let tag of product.tags" variant="default" size="sm">
            {{ tag }}
          </ui-badge>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ProductDetailComponent {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<{ product: Product; quantity: number }>();
  
  quantity = 1;
  formatCurrency = formatCurrency;

  getDiscountedPrice(): number {
    if (this.product.discount) {
      return this.product.price * (1 - this.product.discount / 100);
    }
    return this.product.price;
  }

  incrementQuantity(): void {
    if (this.quantity < this.product.stockQuantity) {
      this.quantity++;
    }
  }

  decrementQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  onAddToCart(): void {
    this.addToCart.emit({ 
      product: this.product, 
      quantity: this.quantity 
    });
  }

  hasSpecifications(): boolean {
    return Object.keys(this.product.specifications || {}).length > 0;
  }

  getSpecifications(): Array<{ key: string; value: string }> {
    return Object.entries(this.product.specifications || {}).map(([key, value]) => ({
      key,
      value
    }));
  }
}