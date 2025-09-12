export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: Date;
  totalAmount: number;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: 'credit_card' | 'paypal' | 'bank_transfer';
  trackingNumber?: string;
  notes?: string;
}

export interface CreateOrderDto {
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: Omit<OrderItem, 'id' | 'subtotal'>[];
  shippingAddress: Order['shippingAddress'];
  paymentMethod: Order['paymentMethod'];
  notes?: string;
}

export interface UpdateOrderStatusDto {
  orderId: string;
  status: Order['status'];
  trackingNumber?: string;
}