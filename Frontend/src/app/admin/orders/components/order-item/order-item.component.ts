import {Component, Input, OnInit} from '@angular/core';
import {IOrder} from "../../interfaces/i-order";

@Component({
  selector: 'tr[app-order-item]',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit  {

  @Input() order: IOrder;
  @Input() index: number;

  constructor(
  ) {}

  ngOnInit() {}

}
