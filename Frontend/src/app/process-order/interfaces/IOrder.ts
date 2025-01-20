import {IPaymentOption} from "../../shared/inferfaces/IPaymentOption";
import {IOrderItem} from "./IOrderItem";

interface IOrderBase {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  address: string;
  paymentMethod: number,
  additional: string,
  subtotal: number,
  items: IOrderItem[]
}

export interface IOrder extends IOrderBase {
  id: number;
  status: string;
  paymentMethodId: IPaymentOption
}

export interface IOrderRequest extends IOrderBase {

}
