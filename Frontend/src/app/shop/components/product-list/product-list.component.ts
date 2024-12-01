import {Component, EventEmitter, Output, Input, OnInit} from '@angular/core';
import {ProductService} from "../../business-logic/product.service";
import {ProductModel} from "../../models/product.model";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {

  @Input() products: ProductModel[];

  @Output() productAdded = new EventEmitter();
  constructor(
    private productService: ProductService
  ) {
  }

  searchTerm: string = '';

  addProductToCart(product: ProductModel) {
    this.productService.addProductToCart(product, this.productAdded);
  }
}
