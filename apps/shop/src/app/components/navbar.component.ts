import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="bg-white shadow-sm border-b">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <a [routerLink]="['/']" class="text-xl font-bold text-gray-900">
              AiShop
            </a>
          </div>

          <!-- Navigation Links -->
          <div class="hidden md:flex items-center space-x-8">
            <a 
              [routerLink]="['/']" 
              routerLinkActive="text-blue-600"
              [routerLinkActiveOptions]="{ exact: true }"
              class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Home
            </a>
            <a 
              [routerLink]="['/orders']" 
              routerLinkActive="text-blue-600"
              class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Orders
            </a>
            <a 
              [routerLink]="['/orders/past']" 
              routerLinkActive="text-blue-600"
              class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Past Orders
            </a>
            <a 
              [routerLink]="['/orders/create']" 
              routerLinkActive="text-blue-600"
              class="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Create Order
            </a>
          </div>

          <!-- Mobile menu button -->
          <div class="md:hidden">
            <button 
              type="button" 
              (click)="toggleMobileMenu()"
              class="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600"
            >
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile Menu -->
        <div class="md:hidden" [class.hidden]="!isMobileMenuOpen">
          <div class="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
            <a 
              [routerLink]="['/']" 
              routerLinkActive="text-blue-600 bg-blue-50"
              [routerLinkActiveOptions]="{ exact: true }"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              (click)="closeMobileMenu()"
            >
              Home
            </a>
            <a 
              [routerLink]="['/orders']" 
              routerLinkActive="text-blue-600 bg-blue-50"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              (click)="closeMobileMenu()"
            >
              Orders
            </a>
            <a 
              [routerLink]="['/orders/past']" 
              routerLinkActive="text-blue-600 bg-blue-50"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              (click)="closeMobileMenu()"
            >
              Past Orders
            </a>
            <a 
              [routerLink]="['/orders/create']" 
              routerLinkActive="text-blue-600 bg-blue-50"
              class="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              (click)="closeMobileMenu()"
            >
              Create Order
            </a>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: []
})
export class NavbarComponent {
  isMobileMenuOpen = false;

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }
}