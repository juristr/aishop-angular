import { filterBySearchTerm, sortBy } from '@aishop-angular/utils';
import { Product, ProductFilter, ProductSort } from './product.model';

const mockProducts: Product[] = [
  {
    id: 'PROD-001',
    name: 'Wireless Headphones Pro',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life',
    price: 299.99,
    category: 'audio',
    brand: 'AudioTech',
    sku: 'AT-WH-001',
    inStock: true,
    stockQuantity: 45,
    images: ['https://images.pexels.com/photos/3945665/pexels-photo-3945665.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'],
    rating: 4.5,
    reviewCount: 234,
    features: [
      'Active Noise Cancellation',
      '30-hour battery life',
      'Bluetooth 5.0',
      'Premium leather cushions'
    ],
    specifications: {
      'Battery Life': '30 hours',
      'Connectivity': 'Bluetooth 5.0',
      'Weight': '250g',
      'Driver Size': '40mm'
    },
    tags: ['wireless', 'noise-cancelling', 'premium'],
    discount: 10,
    isFeatured: true
  },
  {
    id: 'PROD-002',
    name: 'Mechanical Gaming Keyboard',
    description: 'RGB backlit mechanical keyboard with Cherry MX switches',
    price: 149.99,
    category: 'gaming',
    brand: 'GameGear',
    sku: 'GG-KB-001',
    inStock: true,
    stockQuantity: 30,
    images: ['https://images.pexels.com/photos/2115217/pexels-photo-2115217.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'],
    rating: 4.7,
    reviewCount: 456,
    features: [
      'Cherry MX Red switches',
      'Per-key RGB lighting',
      'Aluminum frame',
      'Detachable USB-C cable'
    ],
    specifications: {
      'Switch Type': 'Cherry MX Red',
      'Backlighting': 'RGB',
      'Layout': 'TKL (87 keys)',
      'Connection': 'USB-C'
    },
    tags: ['mechanical', 'gaming', 'rgb'],
    isNew: true
  },
  {
    id: 'PROD-003',
    name: 'USB-C Hub 7-in-1',
    description: 'Versatile USB-C hub with HDMI, USB 3.0, and SD card reader',
    price: 49.99,
    category: 'accessories',
    brand: 'ConnectPro',
    sku: 'CP-HUB-001',
    inStock: true,
    stockQuantity: 100,
    images: ['https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'],
    rating: 4.3,
    reviewCount: 178,
    features: [
      '4K HDMI output',
      '3x USB 3.0 ports',
      'SD/MicroSD card reader',
      '100W PD charging'
    ],
    specifications: {
      'Ports': '7',
      'HDMI': '4K@30Hz',
      'USB': '3x USB 3.0',
      'Power Delivery': '100W'
    },
    tags: ['usb-c', 'hub', 'adapter']
  },
  {
    id: 'PROD-004',
    name: 'Laptop Stand Adjustable',
    description: 'Ergonomic aluminum laptop stand with adjustable height and angle',
    price: 39.99,
    category: 'accessories',
    brand: 'ErgoTech',
    sku: 'ET-LS-001',
    inStock: true,
    stockQuantity: 75,
    images: ['https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'],
    rating: 4.6,
    reviewCount: 89,
    features: [
      'Adjustable height',
      'Aluminum construction',
      'Heat dissipation design',
      'Fits 10-17" laptops'
    ],
    specifications: {
      'Material': 'Aluminum',
      'Compatibility': '10-17 inch laptops',
      'Weight Capacity': '5kg',
      'Adjustable Angles': '6'
    },
    tags: ['ergonomic', 'stand', 'laptop']
  },
  {
    id: 'PROD-005',
    name: 'Wireless Gaming Mouse',
    description: 'High-precision wireless gaming mouse with 16000 DPI sensor',
    price: 89.99,
    category: 'gaming',
    brand: 'GameGear',
    sku: 'GG-MS-001',
    inStock: true,
    stockQuantity: 60,
    images: ['https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'],
    rating: 4.8,
    reviewCount: 321,
    features: [
      '16000 DPI sensor',
      'Wireless & wired modes',
      'RGB lighting',
      '70-hour battery life'
    ],
    specifications: {
      'DPI': '100-16000',
      'Battery Life': '70 hours',
      'Buttons': '8 programmable',
      'Weight': '95g'
    },
    tags: ['wireless', 'gaming', 'mouse'],
    discount: 15,
    isFeatured: true
  },
  {
    id: 'PROD-006',
    name: '4K Webcam Pro',
    description: 'Professional 4K webcam with auto-focus and noise-cancelling mic',
    price: 199.99,
    category: 'electronics',
    brand: 'VideoTech',
    sku: 'VT-WC-001',
    inStock: false,
    stockQuantity: 0,
    images: ['https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'],
    rating: 4.4,
    reviewCount: 145,
    features: [
      '4K resolution',
      'Auto-focus',
      'Dual noise-cancelling mics',
      'Wide angle lens'
    ],
    specifications: {
      'Resolution': '4K (3840x2160)',
      'FPS': '30fps at 4K',
      'Field of View': '90°',
      'Connection': 'USB 3.0'
    },
    tags: ['webcam', '4k', 'streaming']
  },
  {
    id: 'PROD-007',
    name: 'Smart Power Strip',
    description: 'Wi-Fi enabled power strip with app control and surge protection',
    price: 59.99,
    category: 'electronics',
    brand: 'SmartHome',
    sku: 'SH-PS-001',
    inStock: true,
    stockQuantity: 40,
    images: ['https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'],
    rating: 4.2,
    reviewCount: 67,
    features: [
      'Wi-Fi control',
      '4 smart outlets',
      '4 USB ports',
      'Surge protection'
    ],
    specifications: {
      'Outlets': '4 AC + 4 USB',
      'Max Load': '1875W',
      'USB Output': '5V/2.4A per port',
      'App': 'iOS/Android'
    },
    tags: ['smart', 'power', 'wifi'],
    isNew: true
  },
  {
    id: 'PROD-008',
    name: 'Portable SSD 1TB',
    description: 'Ultra-fast portable SSD with USB 3.2 Gen 2 and 1050MB/s speeds',
    price: 129.99,
    category: 'computers',
    brand: 'DataDrive',
    sku: 'DD-SSD-001',
    inStock: true,
    stockQuantity: 85,
    images: ['https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'],
    rating: 4.7,
    reviewCount: 298,
    features: [
      '1TB capacity',
      '1050MB/s read speed',
      'USB 3.2 Gen 2',
      'Shock resistant'
    ],
    specifications: {
      'Capacity': '1TB',
      'Interface': 'USB 3.2 Gen 2',
      'Read Speed': '1050MB/s',
      'Write Speed': '1000MB/s'
    },
    tags: ['ssd', 'storage', 'portable'],
    discount: 20
  }
];

// eslint-disable-next-line prefer-const
let products: Product[] = [...mockProducts];

export function getProducts(filter?: ProductFilter, sort?: ProductSort): Product[] {
  let result = [...products];
  
  // Apply filters
  if (filter) {
    if (filter.category) {
      result = result.filter(p => p.category === filter.category);
    }
    
    if (filter.minPrice !== undefined) {
      result = result.filter(p => p.price >= filter.minPrice!);
    }
    
    if (filter.maxPrice !== undefined) {
      result = result.filter(p => p.price <= filter.maxPrice!);
    }
    
    if (filter.inStock !== undefined) {
      result = result.filter(p => p.inStock === filter.inStock);
    }
    
    if (filter.brand) {
      result = result.filter(p => p.brand.toLowerCase() === filter.brand!.toLowerCase());
    }
    
    if (filter.searchTerm) {
      result = filterBySearchTerm(result, filter.searchTerm, ['name', 'description', 'brand']);
    }
    
    if (filter.tags && filter.tags.length > 0) {
      result = result.filter(p => 
        filter.tags!.some(tag => p.tags.includes(tag))
      );
    }
  }
  
  // Apply sorting
  if (sort) {
    result = sortBy(result, sort.field, sort.order);
  }
  
  return result;
}

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getProductsByCategory(category: Product['category']): Product[] {
  return products.filter(p => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.isFeatured);
}

export function getNewProducts(): Product[] {
  return products.filter(p => p.isNew);
}

export function getDiscountedProducts(): Product[] {
  return products.filter(p => p.discount && p.discount > 0);
}

export function getRelatedProducts(productId: string, limit = 4): Product[] {
  const product = getProductById(productId);
  if (!product) return [];
  
  return products
    .filter(p => 
      p.id !== productId && 
      (p.category === product.category || 
       p.tags.some(tag => product.tags.includes(tag)))
    )
    .slice(0, limit);
}

export function searchProducts(searchTerm: string): Product[] {
  return filterBySearchTerm(products, searchTerm, ['name', 'description', 'brand', 'category']);
}

export function getProductCategories(): Array<{ value: Product['category']; label: string; count: number }> {
  const categories: Product['category'][] = ['electronics', 'accessories', 'computers', 'audio', 'gaming'];
  
  return categories.map(cat => ({
    value: cat,
    label: cat.charAt(0).toUpperCase() + cat.slice(1),
    count: products.filter(p => p.category === cat).length
  }));
}

export function getProductBrands(): Array<{ value: string; count: number }> {
  const brandMap = new Map<string, number>();
  
  products.forEach(p => {
    brandMap.set(p.brand, (brandMap.get(p.brand) || 0) + 1);
  });
  
  return Array.from(brandMap.entries())
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => b.count - a.count);
}

export function getPriceRange(): { min: number; max: number } {
  if (products.length === 0) return { min: 0, max: 0 };
  
  const prices = products.map(p => p.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  };
}

export function updateProductStock(productId: string, quantity: number): boolean {
  const product = products.find(p => p.id === productId);
  
  if (!product) return false;
  
  product.stockQuantity = Math.max(0, product.stockQuantity - quantity);
  product.inStock = product.stockQuantity > 0;
  
  return true;
}

export type { Product, ProductFilter, ProductSort };