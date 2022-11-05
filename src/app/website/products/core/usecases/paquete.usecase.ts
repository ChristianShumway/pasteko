import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PaquetePrimaryInterface } from '../ports/primary/paquete.primary.interface';
import { PaqueteSecondaryInterface } from '../ports/secondary/paquete.secondary.interface';
import { ProductModel } from '../domain/product.model';
import { PaqueteModel } from '../domain/paquete.model';

@Injectable({
	providedIn: 'root',
})
export class PaquetesUsecase extends PaquetePrimaryInterface {

	constructor(
		private secondary: PaqueteSecondaryInterface) {
		super();
	}

  /**
    * @param idVenta id de la venta en curso
    * @returns Array con combos
  */
  getCombos(idVenta?: number): Observable<ProductModel[]> {
    return this.secondary.getCombos(idVenta);
  }

  /**
    * @param codigoPaquete id del paquete seleccionado
    * @returns Array con familias y cantidades posibles a seleccionar en ese combo
  */
  getDetalleCombo(codigoPaquete: string): Observable<PaqueteModel[]> {
    return this.secondary.getDetalleCombo(codigoPaquete);
  }

}
