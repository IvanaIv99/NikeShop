import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../../../shop/business-logic/product.service";

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements OnInit{

  products: any;

  constructor(
    public productService: ProductService,
  ) {
  }

  ngOnInit() {
    this.getProducts();
  }

  private getProducts(): any
  {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data[0];
      },
      error: (e) => console.error(e)
    });
  }

}
