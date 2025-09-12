import { generateId, calculateTotal, calculateTax } from '@aishop-angular/utils';
import { Order, CreateOrderDto, UpdateOrderStatusDto, OrderItem } from './order.model';

const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    customerId: 'CUST-001',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    items: [
      {
        id: 'ITEM-001',
        productId: 'PROD-001',
        productName: 'Wireless Headphones',
        price: 99.99,
        quantity: 1,
        subtotal: 99.99
      }
    ],
    status: 'delivered',
    orderDate: new Date('2024-01-15'),
    totalAmount: 107.99,
    shippingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    paymentMethod: 'credit_card',
    trackingNumber: 'TRK123456789'
  },
  {
    id: 'ORD-002',
    customerId: 'CUST-001',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    items: [
      {
        id: 'ITEM-002',
        productId: 'PROD-002',
        productName: 'Laptop Stand',
        price: 49.99,
        quantity: 2,
        subtotal: 99.98
      }
    ],
    status: 'processing',
    orderDate: new Date('2024-02-20'),
    totalAmount: 107.98,
    shippingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    paymentMethod: 'paypal'
  },
  {
    id: 'ORD-003',
    customerId: 'CUST-002',
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    items: [
      {
        id: 'ITEM-003',
        productId: 'PROD-003',
        productName: 'USB-C Hub',
        price: 39.99,
        quantity: 1,
        subtotal: 39.99
      },
      {
        id: 'ITEM-004',
        productId: 'PROD-004',
        productName: 'Mechanical Keyboard',
        price: 149.99,
        quantity: 1,
        subtotal: 149.99
      }
    ],
    status: 'shipped',
    orderDate: new Date('2024-03-01'),
    totalAmount: 205.18,
    shippingAddress: {
      street: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
      country: 'USA'
    },
    paymentMethod: 'credit_card',
    trackingNumber: 'TRK987654321'
  }
];

let orders: Order[] = [...mockOrders];

export function dataAccessOrder() {
  return {
    getAllOrders,
    getOrderById,
    getOrdersByCustomerId,
    getOrdersByStatus,
    createOrder,
    updateOrderStatus,
    cancelOrder,
    calculateOrderTotal,
    getRecentOrders,
    getPastOrders
  };
}

function getAllOrders(): Order[] {
  return [...orders];
}

function getOrderById(orderId: string): Order | undefined {
  return orders.find(order => order.id === orderId);
}

function getOrdersByCustomerId(customerId: string): Order[] {
  return orders.filter(order => order.customerId === customerId);
}

function getOrdersByStatus(status: Order['status']): Order[] {
  return orders.filter(order => order.status === status);
}

function createOrder(orderData: CreateOrderDto): Order {
  const items: OrderItem[] = orderData.items.map(item => ({
    ...item,
    id: generateId(),
    subtotal: item.price * item.quantity
  }));

  const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
  const tax = calculateTax(subtotal);
  const shipping = 10; // Fixed shipping cost
  const totalAmount = calculateTotal(subtotal, tax, shipping);

  const newOrder: Order = {
    id: `ORD-${generateId()}`,
    customerId: orderData.customerId,
    customerName: orderData.customerName,
    customerEmail: orderData.customerEmail,
    items,
    status: 'pending',
    orderDate: new Date(),
    totalAmount,
    shippingAddress: orderData.shippingAddress,
    paymentMethod: orderData.paymentMethod,
    notes: orderData.notes
  };

  orders.push(newOrder);
  return newOrder;
}

function updateOrderStatus(updateData: UpdateOrderStatusDto): Order | undefined {
  const order = orders.find(o => o.id === updateData.orderId);
  
  if (order) {
    order.status = updateData.status;
    if (updateData.trackingNumber) {
      order.trackingNumber = updateData.trackingNumber;
    }
  }
  
  return order;
}

function cancelOrder(orderId: string): boolean {
  const order = orders.find(o => o.id === orderId);
  
  if (order && ['pending', 'processing'].includes(order.status)) {
    order.status = 'cancelled';
    return true;
  }
  
  return false;
}

function calculateOrderTotal(items: OrderItem[]): number {
  const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
  const tax = calculateTax(subtotal);
  const shipping = 10;
  return calculateTotal(subtotal, tax, shipping);
}

function getRecentOrders(limit = 10): Order[] {
  return orders
    .filter(order => ['pending', 'processing', 'shipped'].includes(order.status))
    .sort((a, b) => b.orderDate.getTime() - a.orderDate.getTime())
    .slice(0, limit);
}

function getPastOrders(customerId?: string): Order[] {
  let pastOrders = orders.filter(order => 
    ['delivered', 'cancelled'].includes(order.status)
  );
  
  if (customerId) {
    pastOrders = pastOrders.filter(order => order.customerId === customerId);
  }
  
  return pastOrders.sort((a, b) => b.orderDate.getTime() - a.orderDate.getTime());
}

export type { Order, CreateOrderDto, UpdateOrderStatusDto, OrderItem };