
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel } from '../../domain/product.model';

@Injectable({
  providedIn: 'root',
})
export abstract class ProductsSecondaryInterface {

  /**
  * @param id id de la línea a cargar
  * @returns Array con productos de la línea
  */
  abstract getProducts(id: string | null): Observable<ProductModel[]>

}