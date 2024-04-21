import {Component, Input, OnInit} from '@angular/core';
import {ProductModel} from "../../../../models/product.model";

@Component({
  selector: 'tr[app-product-item]',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit  {

  @Input() productItem: ProductModel;
  @Input() index: number;

  ngOnInit() {}

}
