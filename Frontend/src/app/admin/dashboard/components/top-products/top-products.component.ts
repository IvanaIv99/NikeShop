import { Component, OnInit } from '@angular/core';
import { BlOrdersRequestsService } from '../../../orders/bussiness-logic/requests/bl-orders-requests.service';
import { BlProductsRequestService } from '../../../products/bussiness-logic/requests/bl-products-request.service';
import {ITopProduct} from "../../../products/interfaces/i-top-product";
import {IStatCard} from "../../../../shared/inferfaces/admin/i-stat-card";

@Component({
  selector: 'app-top-products',
  templateUrl: './top-products.component.html',
  styleUrls: ['./top-products.component.scss']
})
export class TopProductsComponent implements OnInit {

  topProducts: ITopProduct[];

  constructor(
    private productsRequestsService: BlProductsRequestService
  ) {}

  ngOnInit(): void {
    this.loadTopProducts();
  }

  loadTopProducts() {
    this.productsRequestsService.getTopProducts().subscribe(data => {
      this.topProducts = data;
    });
  }
}
