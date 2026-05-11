import {ISize} from "./i-size";
import {IColor} from "./i-color";

export interface IProductVariant {
  id: number;
  size: ISize;
  color: IColor;
  stock: number;
  sku: string | null;
}
