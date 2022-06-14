
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel } from '../../domain/product.model';

@Injectable({
  providedIn: 'root',
})
export abstract class ProductsPrimaryInterface {

  /**
  * @param id id de la línea a cargar
  * @param  idVenta id de la venta en curso
  * @returns Array con productos de la línea
  */
  abstract getProducts(id: string | null, idVenta?: number): Observable<ProductModel[]>

}
