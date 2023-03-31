import { Pipe, PipeTransform } from '@angular/core';
import { IProductResponse } from '../../interfaces/product/product.interface';

@Pipe({
  name: 'pizzaType'
})
export class PizzaTypePipe implements PipeTransform {

  transform(products: IProductResponse[], searchValue: string): IProductResponse[] {
    if (!products) return []
    if (!searchValue) return products;
    return products.filter(prod => prod.type.path == searchValue);
  }

}
