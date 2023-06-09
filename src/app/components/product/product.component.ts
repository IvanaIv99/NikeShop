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

  public activeSize: number;
  public activeColor: string;

  constructor(
    private productService: ProductService
  ) {
  }

  ngOnInit(): void {
    this.categoryString = this.product.categories.map(x => x.name).join(" | ");
  }

  addProductToCart(product) {
    this.productService.addProductToCart(product, this.productAdded);
  }

  public onSelectedAttribute(value: any, attribute: string ): void {
    this.productService.onSelectedAttribute(value, attribute, this.product);
    this.setActiveAttribute(value, attribute);

  }

  public setActiveAttribute(value: any, attribute: string){
    if(attribute == 'size') this.activeSize = value;
    if(attribute == 'color') this.activeColor = value;
  }

}
