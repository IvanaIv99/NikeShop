import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopComponent } from './components/shop/shop.component';
import {CartComponent} from "./components/cart/cart.component";
import {OrderComponent} from "./components/order/order.component";
import {LoginComponent} from "./components/login/login.component";
import {AdminDashboardComponent} from "./components/admin/admin.component";
import { ListProductsComponent} from "./components/admin/products/list-products/list-products.component";
import {AddEditProductComponent} from "./components/admin/products/add-edit-product/add-edit-product.component";

const appRoutes: Routes = [
  { path: '', redirectTo: '/shop', pathMatch: 'full' },
  { path: 'shop', component: ShopComponent },
  { path: 'cart', component: CartComponent },
  { path: 'process_order', component: OrderComponent },
  { path: 'admin/login', component: LoginComponent },
  { path: 'admin/dashboard', component: AdminDashboardComponent},
  { path: 'admin/dashboard/products', component: ListProductsComponent},
  { path: 'admin/dashboard/products/add', component: AddEditProductComponent},
  { path: 'admin/dashboard/products/edit/:id', component: AddEditProductComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
