import {IOrderItem} from "./i-order-item";
import {PaymentMethod} from "../../admin/orders/enums/payment-method";
import {OrderStatus} from "../../admin/orders/enums/order-status";

interface IOrderBase {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  zip: number;
  address: string;
  payment_method: PaymentMethod,
  additional: string,
  subtotal: number,
  items: IOrderItem[]
}

export interface IOrder extends IOrderBase {
  id: number;
  created_at: string,
  status: OrderStatus;
}

export interface IOrderRequest extends IOrderBase {

}
