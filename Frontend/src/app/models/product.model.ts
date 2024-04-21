import {CategoryModel} from './category.model';
import {ColorModel} from './color.model';
import {SizeModel} from './size.model';

export class ProductModel {
  id: number;
  name: string;
  categories:  CategoryModel[];
  description: string;
  price: number;
  image: string;
  sizes: SizeModel[];
  colors: ColorModel[];
  created_at: number;
}
