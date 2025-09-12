import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="bg-gray-800 text-white mt-auto">
      <div class="container mx-auto px-4 py-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Company Info -->
          <div>
            <h3 class="text-lg font-semibold mb-4">AiShop</h3>
            <p class="text-gray-300 text-sm">
              Your one-stop shop for all things tech. Quality products, great prices, and excellent service.
            </p>
          </div>

          <!-- Quick Links -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
            <ul class="space-y-2 text-sm">
              <li><a href="#" class="text-gray-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white transition-colors">Shipping Info</a></li>
            </ul>
          </div>

          <!-- Customer Service -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Customer Service</h3>
            <ul class="space-y-2 text-sm">
              <li><a href="#" class="text-gray-300 hover:text-white transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white transition-colors">Track Your Order</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <!-- Contact Info -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Get in Touch</h3>
            <div class="text-sm text-gray-300 space-y-2">
              <p>Email: support@aishop.com</p>
              <p>Phone: 1-800-AI-SHOP</p>
              <p>Hours: Mon-Fri 9AM-6PM PST</p>
            </div>
          </div>
        </div>

        <div class="border-t border-gray-700 mt-8 pt-8 text-center">
          <p class="text-gray-400 text-sm">
            © {{ currentYear }} AiShop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  `,
  styles: []
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}