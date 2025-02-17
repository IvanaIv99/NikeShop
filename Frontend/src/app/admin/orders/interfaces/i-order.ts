import {IOrderItem} from "../../../process-order/interfaces/IOrderItem";

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
  created_at: string,
  status: string,
  items: IOrderItem[]
}

export interface IOrder extends IOrderBase {
  id: number;
  status: string;
  payment_method: string;
}

