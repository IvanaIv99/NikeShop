import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OrdersRoutingModule} from './orders-routing.module';
import {OrdersComponent} from "./components/orders/orders.component";
import {OrdersTableComponent} from "./components/orders-table/orders-table.component";
import {OrderItemComponent} from "./components/order-item/order-item.component";


@NgModule({
  declarations: [
    OrdersComponent,
    OrdersTableComponent,
    OrderItemComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule
  ]
})
export class OrdersModule { }
