import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { getProductById, Product } from '@aishop-angular/data-access-products';
import { ProductDetailComponent } from '@aishop-angular/ui-product-detail';

@Component({
  selector: 'feat-product-detail-page',
  standalone: true,
  imports: [CommonModule, ProductDetailComponent],
  template: `
    <div class="container mx-auto px-4 py-8">
      <ui-product-detail 
        *ngIf="product"
        [product]="product"
        (addToCart)="handleAddToCart($event)"
      ></ui-product-detail>
      <div *ngIf="!product" class="text-center py-12">
        <p class="text-gray-500">Product not found</p>
      </div>
    </div>
  `,
  styles: []
})
export class ProductDetailPageComponent implements OnInit {
  product?: Product;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productId = params['id'];
      if (productId) {
        this.product = getProductById(productId);
        if (!this.product) {
          this.router.navigate(['/']);
        }
      }
    });
  }

  handleAddToCart(event: { product: Product; quantity: number }): void {
    console.log('Adding to cart:', event);
    // TODO: Implement cart functionality
  }
}
