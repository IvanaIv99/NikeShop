import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../../../shop/business-logic/product.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{

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
