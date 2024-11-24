import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopComponent } from './components/shop/shop.component';
import {CartComponent} from "./components/cart/cart.component";
import {OrderComponent} from "./components/order/order.component";
import {LoginComponent} from "./components/login/login.component";
import {AdminDashboardComponent} from "./components/admin/admin.component";
import { ListProductsComponent} from "./components/admin/products/list-products/list-products.component";
import {UpsertProductComponent} from "./components/admin/products/upsert-product/upsert-product.component";

const appRoutes: Routes = [
  { path: '', redirectTo: '/shop', pathMatch: 'full' },
  { path: 'shop', component: ShopComponent, children: [
      {path: 'cart', component: CartComponent }
    ]
  },
  // { path: 'cart', component: CartComponent },
  { path: 'process_order', component: OrderComponent },
  { path: 'admin/login', component: LoginComponent },
  { path: 'admin/dashboard', component: AdminDashboardComponent},
  { path: 'admin/dashboard/products', component: ListProductsComponent},
  { path: 'admin/dashboard/products/add', component: UpsertProductComponent},
  { path: 'admin/dashboard/products/edit/:id', component: UpsertProductComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
