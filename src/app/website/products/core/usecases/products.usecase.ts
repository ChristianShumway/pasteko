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
  * @param  idVenta id de la venta en curso
  * @returns Array con productos de la línea
  */
  getProducts(id: string, idVenta?: number): Observable<ProductModel[]> {
    return this.secondary.getProducts(id, idVenta);
  }

}
