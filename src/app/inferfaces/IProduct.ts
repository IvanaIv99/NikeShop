import {Categories} from "./ICategories";

export interface Product {
  id: number;
  name: string;
  categories:  Categories[];
  description: string;
  price: number;
  imageUrl: string;
  sizes: number[];

}
