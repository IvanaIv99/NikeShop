import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {LayoutComponent} from "./components/layout/layout.component";
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import {MatListModule} from "@angular/material/list";
import {MatBadgeModule} from "@angular/material/badge";
import {MatMenuModule} from "@angular/material/menu";
import {MatSidenavModule} from "@angular/material/sidenav";
import {NavBarComponent} from "./components/layout/components/nav-bar/nav-bar.component";
import {NavigationComponent} from "./components/layout/components/navigation/navigation.component";
import {NavContentComponent} from "./components/layout/components/navigation/nav-content/nav-content.component";
import {
  NavCollapseComponent
} from "./components/layout/components/navigation/nav-content/nav-collapse/nav-collapse.component";
import {NavGroupComponent} from "./components/layout/components/navigation/nav-content/nav-group/nav-group.component";
import {NavItemComponent} from "./components/layout/components/navigation/nav-content/nav-item/nav-item.component";
import {MatNativeDateModule} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {FooterComponent} from "./components/layout/components/footer/footer.component";

@NgModule({
  declarations: [
    LayoutComponent,
    NavBarComponent,
    FooterComponent,
    NavigationComponent,
    NavContentComponent,
    NavCollapseComponent,
    NavGroupComponent,
    NavItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    NgScrollbarModule,
    NgIf,
    TranslateModule,
    MatListModule,
    MatBadgeModule,
    MatMenuModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class LayoutModule { }
