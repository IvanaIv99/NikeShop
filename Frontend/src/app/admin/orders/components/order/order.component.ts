import {Component, OnInit} from '@angular/core';
import {BlOrdersRequestsService} from "../../bussiness-logic/requests/bl-orders-requests.service";
import {ActivatedRoute} from "@angular/router";
import {PaymentMethod} from "../../enums/payment-method";
import {OrderStatus} from "../../enums/order-status";
import {SnackbarService} from "../../../../shared/services/common/snackbar/SnackbarService";
import {IOrder} from "../../../../process-order/interfaces/i-order";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  public order: IOrder;

  constructor(
      public requestsService: BlOrdersRequestsService,
      public snackbarService: SnackbarService,
      private route: ActivatedRoute,
  ) {
  }
  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.getOrder(id);
  }

  statuses: string[] = Object.values(OrderStatus);
  loading: boolean;
  updateStatus() {
    this.requestsService.changeStatus(this.order.id, this.order.status).subscribe({
      next: (res) => {
        this.loading = false;
        this.snackbarService.showSuccess('Saved.');
      },
      error: (error) => {
        this.loading = false;
        this.snackbarService.showError(error);
      }
    });
  }

  private getOrder(id: number): void
  {
    this.requestsService.getOneOrder(id).subscribe({
      next: (response) => {
        this.order = response;
        console.log(this.order);
      },
      error: (e) => console.error(e)
    });
  }

  protected readonly PaymentMethod = PaymentMethod;
}
