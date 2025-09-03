import { Component, OnInit } from '@angular/core';
import { BlOrdersRequestsService } from '../../../orders/bussiness-logic/requests/bl-orders-requests.service';
import { BlProductsRequestService } from '../../../products/bussiness-logic/requests/bl-products-request.service';
import {ITopProduct} from "../../../products/interfaces/i-top-product";
import {IStatCard} from "../../../../shared/inferfaces/admin/i-stat-card";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  ngOnInit(): void {

  }
}
