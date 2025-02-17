import {Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import {ProductService} from "../../business-logic/product.service";
import {ProductModel} from "../../models/product.model";
import {SizeModel} from "../../models/size.model";
import {ColorModel} from "../../models/color.model";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent  implements OnInit {
  @Input() product: ProductModel;
  @Input() categoryString: string;
  @Output() productAdded = new EventEmitter();

  public activeSize: SizeModel|null;
  public activeColor: ColorModel|null;

  constructor(
    private productService: ProductService
  ) {
  }

  ngOnInit(): void {
  }

  addProductToCart(product: ProductModel) {
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
