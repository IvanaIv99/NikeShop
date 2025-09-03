import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../../interfaces/i-product';

@Pipe({ name: 'filter' })
export class ProductFilterPipe implements PipeTransform {

  transform(products: IProduct[], searchTerm: string, fields: string[] = ['name', 'description']): IProduct[] {
    if (!products) return [];
    if (!searchTerm) return products;

    const term = searchTerm.toString().toUpperCase();

    return products.filter(product => {
      return fields.some(field => {
        const value = product[field];
        if (value != null) {
          const prop = value.toString().toUpperCase();
          return prop.includes(term);
        }
        return false;
      });
    });
  }
}
