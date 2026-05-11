import {IOrderItem} from "./i-order-item";
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
  subtotal: number,
  orderItems: IOrderItem[]
}

export interface IOrder extends IOrderBase {
  id: number;
  created_at: string,
  status: OrderStatus;
}

export interface IOrderRequest extends IOrderBase {

}
