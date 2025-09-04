import { Component, OnInit } from '@angular/core';
import { BlProductsRequestService } from '../../../products/bussiness-logic/requests/bl-products-request.service';
import {IProduct} from "../../../products/interfaces/i-top-product";

@Component({
  selector: 'app-top-products',
  templateUrl: './top-products.component.html',
  styleUrls: ['./top-products.component.scss']
})
export class TopProductsComponent implements OnInit {

  public topSellingProducts: IProduct[];

  constructor(
    private productsRequestsService: BlProductsRequestService
  ) {}

  ngOnInit(): void {
    this.loadTopProducts();
  }

  public loadTopProducts() {
    this.productsRequestsService.getProductsStatistics().subscribe(data => {
      this.topSellingProducts = data.three_top_selling
    });
  }
}
