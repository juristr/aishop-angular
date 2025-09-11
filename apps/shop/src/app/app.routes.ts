import { Route } from '@angular/router';
import { HomePageComponent } from './pages/home.component';
import { OrdersPageComponent } from './pages/orders.component';
import { PastOrdersPageComponent } from './pages/past-orders.component';
import { CreateOrderPageComponent } from './pages/create-order.component';

export const appRoutes: Route[] = [
  { path: '', component: HomePageComponent },
  { path: 'product/:id', loadComponent: () => import('@aishop-angular/feat-product-detail').then(m => m.FeatProductDetailComponent) },
  { path: 'orders', component: OrdersPageComponent },
  { path: 'orders/past', component: PastOrdersPageComponent },
  { path: 'orders/create', component: CreateOrderPageComponent },
];
