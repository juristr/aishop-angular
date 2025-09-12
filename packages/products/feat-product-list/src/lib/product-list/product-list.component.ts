import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { 
  getProducts, 
  getFeaturedProducts, 
  getNewProducts,
  getDiscountedProducts,
  Product
} from '@aishop-angular/data-access-products';
import { CardComponent, BadgeComponent, ButtonComponent } from '@aishop-angular/ui';
import { formatCurrency } from '@aishop-angular/utils';

@Component({
  selector: 'feat-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, CardComponent, BadgeComponent, ButtonComponent],
  template: `
    <div class="container mx-auto px-4">
      <!-- Filter Tabs -->
      <div class="flex gap-4 mb-6">
        <ui-button 
          [variant]="currentFilter === 'all' ? 'primary' : 'ghost'"
          (buttonClick)="setFilter('all')"
          data-testid="filter-all-products"
        >
          All Products
        </ui-button>
        <ui-button 
          [variant]="currentFilter === 'featured' ? 'primary' : 'ghost'"
          (buttonClick)="setFilter('featured')"
          data-testid="filter-featured"
        >
          Featured
        </ui-button>
        <ui-button 
          [variant]="currentFilter === 'new' ? 'primary' : 'ghost'"
          (buttonClick)="setFilter('new')"
          data-testid="filter-new-arrivals"
        >
          New Arrivals
        </ui-button>
        <ui-button 
          [variant]="currentFilter === 'sale' ? 'primary' : 'ghost'"
          (buttonClick)="setFilter('sale')"
          data-testid="filter-on-sale"
        >
          On Sale
        </ui-button>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <ui-card 
          *ngFor="let product of products" 
          [hoverable]="true"
          [noPadding]="true"
          class="cursor-pointer"
          data-testid="product-card"
        >
          <a [routerLink]="['/product', product.id]" class="block">
            <div class="aspect-square bg-gray-100">
              <img 
                [src]="product.images[0] || 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'" 
                [alt]="product.name"
                class="w-full h-full object-cover"
              >
            </div>
            <div class="p-4">
              <div class="flex items-start justify-between mb-2">
                <h3 class="font-semibold text-gray-900">{{ product.name }}</h3>
                <div class="flex gap-1">
                  <ui-badge *ngIf="product.isNew" variant="info" size="sm">New</ui-badge>
                  <ui-badge *ngIf="product.discount" variant="danger" size="sm">-{{ product.discount }}%</ui-badge>
                </div>
              </div>
              <p class="text-sm text-gray-600 mb-2 line-clamp-2" data-testid="product-description">{{ product.description }}</p>
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-lg font-bold text-gray-900" data-testid="product-price">
                    {{ formatCurrency(getDiscountedPrice(product)) }}
                  </span>
                  <span *ngIf="product.discount" class="text-sm text-gray-500 line-through ml-2">
                    {{ formatCurrency(product.price) }}
                  </span>
                </div>
                <ui-badge [variant]="product.inStock ? 'success' : 'danger'" size="sm">
                  {{ product.inStock ? 'In Stock' : 'Out of Stock' }}
                </ui-badge>
              </div>
              <div class="flex items-center gap-1 mt-2">
                <span class="text-yellow-400 text-sm">★</span>
                <span class="text-sm text-gray-600">{{ product.rating }} ({{ product.reviewCount }})</span>
              </div>
            </div>
          </a>
        </ui-card>
      </div>

      <!-- Empty State -->
      <div *ngIf="products.length === 0" class="text-center py-12">
        <p class="text-gray-500">No products found</p>
      </div>
    </div>
  `,
  styles: [`
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentFilter: 'all' | 'featured' | 'new' | 'sale' = 'all';
  formatCurrency = formatCurrency;

  ngOnInit(): void {
    this.loadProducts();
  }

  setFilter(filter: 'all' | 'featured' | 'new' | 'sale'): void {
    this.currentFilter = filter;
    this.loadProducts();
  }

  loadProducts(): void {
    switch (this.currentFilter) {
      case 'featured':
        this.products = getFeaturedProducts();
        break;
      case 'new':
        this.products = getNewProducts();
        break;
      case 'sale':
        this.products = getDiscountedProducts();
        break;
      default:
        this.products = getProducts();
    }
  }

  getDiscountedPrice(product: Product): number {
    if (product.discount) {
      return product.price * (1 - product.discount / 100);
    }
    return product.price;
  }
}