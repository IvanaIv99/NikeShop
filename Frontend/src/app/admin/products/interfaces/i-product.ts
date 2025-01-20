import {Categories} from "../../../shared/inferfaces/ICategories";
import {Colors} from "../../../shared/inferfaces/IColors";

export interface IProduct {
  id: number;
  name: string;
  categories:  Categories[];
  description: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  colors: Colors[]
}
