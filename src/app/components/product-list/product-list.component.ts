import {Component, EventEmitter, Output, Input} from '@angular/core';
import {ProductService} from "../../services/product/product.service";
import {Product} from "../../inferfaces/IProduct";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent  {

  @Input() products: Product[];
  @Output() productAdded = new EventEmitter();
  constructor(
    private productService: ProductService
  ) {
  }

  searchTerm: string = '';

  addProductToCart(product) {
    this.productService.addProductToCart(product, this.productAdded);
  }
}
