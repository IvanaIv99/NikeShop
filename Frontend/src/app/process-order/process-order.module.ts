import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessOrderRoutingModule } from './process-order-routing.module';
import { SharedModule } from '../shared/shared.module';
import {ProcessOrderComponent} from "./components/process-order/process-order.component";

@NgModule({
  declarations: [
    ProcessOrderComponent,
  ],
  imports: [
    CommonModule,
    ProcessOrderRoutingModule,
    SharedModule
  ]
})
export class ProcessOrderModule { }
