import { Pipe, PipeTransform } from '@angular/core';
import {ProductModel} from "../../models/product.model";
@Pipe({ name: 'filter' })
export class ProductPipe implements PipeTransform{
  transform(products : ProductModel[], searchTerm: any){
    let filteredList=[];
    if(searchTerm){
      let newSearchTerm=!isNaN(searchTerm)? searchTerm.toString(): searchTerm.toString().toUpperCase();
      let prop;
      // @ts-ignore
      return products.filter( product=>{
        for (let key in product) {
          if(product[key]){
            prop = isNaN(product[key]) ? product[key].toString().toUpperCase() : product[key].toString();
            if (prop.indexOf(newSearchTerm) > -1) {
              filteredList.push(product);
              return filteredList;
            }
          }
        }
      })
    }
    else{
      return products;
    }
  }
}
