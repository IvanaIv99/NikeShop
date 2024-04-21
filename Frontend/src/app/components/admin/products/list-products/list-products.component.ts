import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../../../services/product/product.service";
import {CartService} from "../../../../services/cart/cart.service";

@Component({
  selector: 'app-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit{

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
        console.log(data);
        this.products = data[0];
      },
      error: (e) => console.error(e)
    });
  }

}
