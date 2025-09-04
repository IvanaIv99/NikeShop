import {Component, EventEmitter, Output, Input} from '@angular/core';
import {ShopService} from "../../business-logic/services/shop.service";
import {IProduct} from "../../interfaces/i-product";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {

  @Input() products: IProduct[];

  @Output() productAdded = new EventEmitter();
  constructor(
    private shopService: ShopService
  ) {
  }

  protected searchTerm: string = '';

  protected addProductToCart(product: IProduct) {
    this.shopService.addProductToCart(product, this.productAdded);
  }
}
