import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessOrderRoutingModule } from './process-order-routing.module';
import { SharedModule } from '../shared/shared.module';
import {ProcessOrderComponent} from "./components/process-order/process-order.component";
import {OrderSuccessComponent} from "./components/order-success/order-success.component";

@NgModule({
  declarations: [
    ProcessOrderComponent,
    OrderSuccessComponent
  ],
  imports: [
    CommonModule,
    ProcessOrderRoutingModule,
    SharedModule
  ]
})
export class ProcessOrderModule { }
