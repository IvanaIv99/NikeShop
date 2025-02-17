import {Component, OnInit} from '@angular/core';
import {BlOrdersRequestsService} from "../../bussiness-logic/requests/bl-orders-requests.service";
import {ActivatedRoute} from "@angular/router";
import {IOrder} from "../../interfaces/i-order";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  public order: IOrder;

  constructor(
      public requestsService: BlOrdersRequestsService,
      private route: ActivatedRoute,
  ) {
  }
  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.getOrder(id);
  }

  private getOrder(id: number): void
  {
    this.requestsService.getOneOrder(id).subscribe({
      next: (response) => {
        this.order = response['data'];
      },
      error: (e) => console.error(e)
    });
  }
}
