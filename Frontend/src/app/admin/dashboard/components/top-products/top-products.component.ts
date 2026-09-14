import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { BlProductsRequestService } from '../../../products/bussiness-logic/requests/bl-products-request.service';
import { IProduct, IProductsStatistics } from '../../../products/interfaces/i-top-product';
import { DashboardRange } from '../../../../shared/inferfaces/admin/dashboard-range';

@Component({
    selector: 'app-top-products',
    templateUrl: './top-products.component.html',
    styleUrls: ['./top-products.component.scss'],
    standalone: false
})
export class TopProductsComponent implements OnInit, OnChanges {
  @Input() range: DashboardRange = '24h';

  public topSellingProducts: IProduct[] = [];

  private stats?: IProductsStatistics;

  constructor(
    private productsRequestsService: BlProductsRequestService
  ) {}

  ngOnInit(): void {
    this.productsRequestsService.getProductsStatistics().subscribe(data => {
      this.stats = data;
      this.updateProducts();
    });
  }

  ngOnChanges(): void {
    this.updateProducts();
  }

  private updateProducts(): void {
    this.topSellingProducts = this.stats?.[this.range] ?? [];
  }
}
