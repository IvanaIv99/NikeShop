import {SizeModel} from "../../shop/models/size.model";
import {ColorModel} from "../../shop/models/color.model";

export interface ICartItem {
  id: number;
  name: string;
  price: number;
  size: SizeModel;
  color: ColorModel;
  total: number;
  quantity: number;
}
