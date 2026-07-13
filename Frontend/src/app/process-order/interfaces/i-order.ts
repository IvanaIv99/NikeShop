import {IOrderItem, IOrderItemRequest} from "./i-order-item";
import {PaymentMethod} from "../../admin/orders/enums/payment-method";
import {OrderStatus} from "../../admin/orders/enums/order-status";

interface IOrderBase {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  zip: number;
  address: string;
  paymentMethod: PaymentMethod,
  additional: string,
}

export interface IOrder extends IOrderBase {
  id: number;
  createdAt: string,
  status: OrderStatus;
  subtotal: number;
  orderItems: IOrderItem[];
}

export interface IOrderRequest extends IOrderBase {
  orderItems: IOrderItemRequest[];
}
