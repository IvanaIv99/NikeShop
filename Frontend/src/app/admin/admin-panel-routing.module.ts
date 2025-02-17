import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent as AdminLayoutComponent} from "./layout/components/layout/layout.component";
import {AuthGuard} from "../shared/guards/auth.guard";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "dashboard"
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: "products",
    loadChildren: () => import('./products/products.module').then((m) => m.ProductsModule),
  },
  {
    path: "orders",
    loadChildren: () => import('./orders/orders.module').then((m) => m.OrdersModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }
