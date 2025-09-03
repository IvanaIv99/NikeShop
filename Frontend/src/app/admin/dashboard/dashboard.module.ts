import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {SharedModule} from "../../shared/shared.module";
import {StatsComponent} from "./components/stats/stats.component";
import {TopProductsComponent} from "./components/top-products/top-products.component";


@NgModule({
  declarations: [
    DashboardComponent,
    StatsComponent,
    TopProductsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
