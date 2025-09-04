import {Component, OnInit} from '@angular/core';
import {BlOrdersRequestsService} from "../../bussiness-logic/requests/bl-orders-requests.service";
import {ActivatedRoute} from "@angular/router";
import {PaymentMethod} from "../../enums/payment-method";
import {OrderStatus} from "../../enums/order-status";
import {SnackbarService} from "../../../../shared/business-logic/services/common/snackbar/SnackbarService";
import {IOrder} from "../../../../process-order/interfaces/i-order";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  protected order: IOrder;

  constructor(
      private requestsService: BlOrdersRequestsService,
      private snackbarService: SnackbarService,
      private route: ActivatedRoute,
  ) {
  }
  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.getOrder(id);
  }

  protected statuses: string[] = Object.values(OrderStatus);

  protected updateStatus() {
    this.requestsService.changeStatus(this.order.id, this.order.status).subscribe({
      next: () => this.snackbarService.showSuccess('Saved.'),
      error: () => this.snackbarService.showError('Error saving order.')
    });
  }

  private getOrder(id: number): void
  {
    this.requestsService.getOneOrder(id).subscribe({
      next: (response: IOrder) => this.order = response,
      error: () => this.snackbarService.showError("Error getting order")
    });
  }

  protected readonly PaymentMethod = PaymentMethod;
}
