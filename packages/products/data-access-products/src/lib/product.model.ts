export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'electronics' | 'accessories' | 'computers' | 'audio' | 'gaming';
  brand: string;
  sku: string;
  inStock: boolean;
  stockQuantity: number;
  images: string[];
  rating: number;
  reviewCount: number;
  features: string[];
  specifications: Record<string, string>;
  tags: string[];
  discount?: number;
  isNew?: boolean;
  isFeatured?: boolean;
}

export interface ProductFilter {
  category?: Product['category'];
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  brand?: string;
  searchTerm?: string;
  tags?: string[];
}

export interface ProductSort {
  field: 'name' | 'price' | 'rating' | 'reviewCount';
  order: 'asc' | 'desc';
}