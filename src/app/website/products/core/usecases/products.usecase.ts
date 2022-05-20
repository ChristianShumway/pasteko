import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProductsPrimaryInterface } from '../ports/primary/products.primary.interface';
import { ProductsSecondaryInterface } from '../ports/secondary/products.secondary.interface';
import { ProductModel } from '../domain/product.model';

@Injectable({
	providedIn: 'root',
})
export class ProductsUsecase extends ProductsPrimaryInterface {


	constructor(
		private secondary: ProductsSecondaryInterface) {
		super();
	}

  /**
  * @param id id de la línea a cargar
  * @returns Array con productos de la línea
  */
  getProducts(id: string): Observable<ProductModel[]> {
    return this.secondary.getProducts(id);
  }

}
