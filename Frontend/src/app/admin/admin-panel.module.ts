import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import {LayoutModule} from "./layout/layout.module";

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    LayoutModule
  ]
})
export class AdminPanelModule { }
