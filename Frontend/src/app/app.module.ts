import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { CartComponent } from './components/cart/cart.component';
import { ProductComponent } from './components/product/product.component';
import { CartItemComponent } from './components/cart/cartitem/cartitem.component';
import { ShopComponent } from './components/shop/shop.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatTableModule} from "@angular/material/table";
import { ProductListComponent } from './components/product-list/product-list.component';
import {ProductPipe} from "./pipes/products/product.pipe";
import {MatInputModule} from "@angular/material/input";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatSelectModule} from "@angular/material/select";
import { FooterComponent } from './components/footer/footer.component';
import {CommonModule, NgForOf} from "@angular/common";
import {OrderComponent} from "./components/order/order.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './components/admin/admin.component'
import {MatTabsModule} from "@angular/material/tabs";
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import {MatGridListModule} from "@angular/material/grid-list";
import { OrdersComponent } from './components/admin/orders/orders.component';
import { ListProductsComponent } from './components/admin/products/list-products/list-products.component';
// @ts-ignore
import { ProductItemComponent } from "./components/admin/products/product-item/product-item.component";
import {MatMenuModule} from "@angular/material/menu";
import {DataTablesModule} from "angular-datatables";
import { UpsertProductComponent } from './components/admin/products/upsert-product/upsert-product.component';
import {RouterModule} from "@angular/router";
import {MatSnackBarModule} from "@angular/material/snack-bar";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CartComponent,
    ProductComponent,
    CartItemComponent,
    ShopComponent,
    ProductListComponent,
    ProductPipe,
    FooterComponent,
    OrderComponent,
    LoginComponent,
    AdminDashboardComponent,
    DashboardComponent,
    OrdersComponent,
    ListProductsComponent,
    ProductItemComponent,
    UpsertProductComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatListModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        NgbModule,
        MatTableModule,
        MatInputModule,
        FontAwesomeModule,
        MatSelectModule,
        NgForOf,
        HttpClientModule,
        MatTabsModule,
        MatGridListModule,
        MatMenuModule,
        DataTablesModule,
        MatSnackBarModule
    ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
