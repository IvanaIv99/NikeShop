import { Component, OnInit } from '@angular/core';
import { BlProductsRequestService } from '../../../admin/products/bussiness-logic/requests/bl-products-request.service';
import { IProduct } from '../../../shop/interfaces/i-product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public featured: IProduct[] = [];

  constructor(private productsService: BlProductsRequestService) {}

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe({
      next: (products) => {
        this.featured = (products || []).slice(0, 5);
      },
      error: () => { /* silent — page still renders */ }
    });
  }

  public heroImage(): string | null {
    return this.featured[0]?.image ?? null;
  }
}
