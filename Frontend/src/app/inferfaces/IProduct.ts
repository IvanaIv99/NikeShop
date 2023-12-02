import {Categories} from "./ICategories";
import {Colors} from "./IColors";

export interface Product {
  id: number;
  name: string;
  categories:  Categories[];
  description: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  colors: Colors[]

}
