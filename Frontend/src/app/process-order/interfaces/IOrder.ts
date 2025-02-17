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
  payment_method: string,
  additional: string,
  subtotal: number,
  items: IOrderItem[]
}

export interface IOrder extends IOrderBase {
  id: number;
  status: string;
  payment_method: string;
}

export interface IOrderRequest extends IOrderBase {

}
