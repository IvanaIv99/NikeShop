import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OrdersRoutingModule} from './orders-routing.module';
import {OrderComponent} from "./components/order/order.component";
import {OrdersTableComponent} from "./components/orders-table/orders-table.component";
import {SharedModule} from "../../shared/shared.module";
import {OrdersComponent} from "./components/orders/orders.component";


@NgModule({
  declarations: [
    OrdersComponent,
    OrdersTableComponent,
    OrderComponent,
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    SharedModule
  ]
})
export class OrdersModule { }
