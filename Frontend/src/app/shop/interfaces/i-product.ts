import {ICategory} from "./i-category";
import {IProductVariant} from "./i-product-variant";

export interface IProduct {
  id: number;
  name: string;
  categories: ICategory[];
  description: string;
  price: number;
  image: string;
  variants: IProductVariant[];
  created_at?: number;
}
