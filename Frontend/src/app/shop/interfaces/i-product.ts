import {ISize} from "./i-size";
import {IColor} from "./i-color";
import {ICategory} from "./i-category";

export interface IProduct {
  id: number;
  name: string;
  categories:  ICategory[];
  description: string;
  price: number;
  image: string;
  sizes: ISize[];
  colors: IColor[];
  created_at: number;
}
