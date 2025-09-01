import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutModule } from './layout/layout.module';
import {SharedModule} from "./shared/shared.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AdminPanelModule} from "./admin/admin-panel.module";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from "@angular/material/form-field";

@NgModule({

  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    LayoutModule,
    SharedModule,
    BrowserAnimationsModule,
    AdminPanelModule
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {color: 'accent'}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
