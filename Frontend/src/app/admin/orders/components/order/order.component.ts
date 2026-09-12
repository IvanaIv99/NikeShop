import {Component, OnInit} from '@angular/core';
import {BlOrdersRequestsService} from "../../bussiness-logic/requests/bl-orders-requests.service";
import {extractApiErrorMessage} from "../../../../shared/utils/api-error";
import {ActivatedRoute} from "@angular/router";
import {PaymentMethod} from "../../enums/payment-method";
import {OrderStatus} from "../../enums/order-status";
import {SnackbarService} from "../../../../shared/business-logic/services/common/snackbar/snackbar.service";
import {IOrder} from "../../../../process-order/interfaces/i-order";

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss'],
    standalone: false
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
      error: (err) => this.snackbarService.showError(extractApiErrorMessage(err, 'Error saving order.'))
    });
  }

  private getOrder(id: number): void
  {
    this.requestsService.getOneOrder(id).subscribe({
      next: (response: IOrder) => this.order = response,
      error: (err) => this.snackbarService.showError(extractApiErrorMessage(err, 'Error getting order.'))
    });
  }

  protected readonly PaymentMethod = PaymentMethod;

  protected downloadingPdf = false;

  protected downloadPdf(): void {
    if (this.downloadingPdf || !this.order) return;
    this.downloadingPdf = true;

    this.requestsService.downloadPdf(this.order.id).subscribe({
      next: (blob) => {
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = `order-${this.order.id}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(blobUrl);
        this.downloadingPdf = false;
      },
      error: (err) => {
        this.snackbarService.showError(extractApiErrorMessage(err, 'Could not generate PDF.'));
        this.downloadingPdf = false;
      }
    });
  }
}
