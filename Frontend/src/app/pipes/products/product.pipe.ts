import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'filter' })
export class ProductPipe implements PipeTransform{
  transform(products,searchTerm){
    let filteredList=[];
    if(searchTerm){
      let newSearchTerm=!isNaN(searchTerm)? searchTerm.toString(): searchTerm.toString().toUpperCase();
      let prop;
      // @ts-ignore
      return products.filter( product=>{
        for (let key in product) {
          prop = isNaN(product[key]) ? product[key].toString().toUpperCase() : product[key].toString();
          if (prop.indexOf(newSearchTerm) > -1) {
            filteredList.push(product);
            return filteredList;
          }
        }
      })
    }
    else{
      return products;
    }}
}
