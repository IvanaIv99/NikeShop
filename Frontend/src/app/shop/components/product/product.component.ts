import {Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import {ShopService} from "../../business-logic/services/shop.service";
import {ISize} from "../../interfaces/i-size";
import {IColor} from "../../interfaces/i-color";
import {IProduct} from "../../interfaces/i-product";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent  implements OnInit {
  @Input() product: IProduct;
  @Input() categoryString: string;
  @Output() productAdded = new EventEmitter();

  protected selectedAttributes: {
    size: ISize | null;
    color: IColor | null;
  } = {
    size: null,
    color: null
  };

  constructor(
    private productService: ShopService
  ) {
  }

  ngOnInit(): void {
  }

  addProductToCart(product: IProduct) {
    this.productService.addProductToCart(product, this.productAdded);
  }

  onSelectedAttribute(attribute: string, value: any) {
    this.productService.onSelectedAttribute(value, attribute, this.product);
    this.selectedAttributes[attribute] = value;
  }
}
