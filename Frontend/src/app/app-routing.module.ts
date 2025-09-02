import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LayoutComponent} from "./layout/components/layout/layout.component";
import {AuthGuard} from "./shared/guards/auth.guard";
import { LayoutComponent as AdminLayoutComponent } from "./admin/layout/components/layout/layout.component";

const appRoutes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "home"
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'shop',
        loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule)
      },
      {
        path: 'cart',
        loadChildren: () => import('./cart/cart.module').then(m => m.CartModule)
      },
      {
        path: 'process-order',
        loadChildren: () => import('./process-order/process-order.module').then(m => m.ProcessOrderModule)
      }
    ]
  },
  {
    path: "admin-panel",
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./admin/admin-panel.module').then((m) => m.AdminPanelModule),
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
