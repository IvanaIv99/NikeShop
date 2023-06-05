import {Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import {ProductService} from "../../services/product/product.service";
import {Product} from "../../inferfaces/IProduct";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent  implements OnInit {

  @Input() product: Product;
  @Input() categoryString: string;
  @Output() productAdded = new EventEmitter();
  constructor(
    private productService: ProductService
  ) {
  }

  ngOnInit(): void {
    this.categoryString = this.product.categories.map(x => x.name).join(" | ");
  }

  addProductToCart(product) {
    this.productService.addProductToCart(product, this.productAdded);
    alert("Product added to cart.");
  }
  onChangedAttribute(value) {
    this.productService.onChangedAttribute(value, this.product);
  }
}
