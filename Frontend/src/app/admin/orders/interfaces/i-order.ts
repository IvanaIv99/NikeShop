import {IOrderItem} from "../../../process-order/interfaces/IOrderItem";
import {OrderStatus} from "../enums/order-status";
import {PaymentMethod} from "../enums/payment-method";

interface IOrderBase {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  address: string;
  payment_method: PaymentMethod,
  additional: string,
  subtotal: number,
  created_at: string,
  status: OrderStatus,
  items: IOrderItem[]
}

export interface IOrder extends IOrderBase {
  id: number;
  status: OrderStatus;
  payment_method: PaymentMethod;
}

