import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel } from '../../domain/product.model';
import { PaqueteModel } from '../../domain/paquete.model';

@Injectable({
  providedIn: 'root',
})
export abstract class PaqueteSecondaryInterface {

  /**
    * @param idVenta id de la venta en curso
    * @returns Array con combos
  */
  abstract getCombos(idVenta?: number): Observable<ProductModel[]>

  /**
    * @param codigoPaquete id del paquete seleccionado
    * @returns Array con familias y cantidades posibles a seleccionar en ese combo
  */
  abstract getDetalleCombo(codigoPaquete: string): Observable<PaqueteModel[]>

}
