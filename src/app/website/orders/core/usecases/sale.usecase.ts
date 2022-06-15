import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ResponseOrderDetailtModel } from '../domain/order-detail.model';
import { SalePrimaryInterface } from '../ports/primary/sale.primary.interface';
import { SaleSecondaryInterface } from '../ports/secondary/sale.secondary.interface';

@Injectable({
	providedIn: 'root',
})
export class SalesUsecase extends SalePrimaryInterface {


	constructor(
		private secondary: SaleSecondaryInterface) {
		super();
	}

  /**
  * @param id del pedido
  * @returns mensaje de confirmación
  */
  deleteSale(idPedido: number): Observable<any> {
    return this.secondary.deleteSale(idPedido);
  }

  /**
  * @params id del pedido
  * @returns datos del pedido
  */
  getCurrentSale(idPedido: number): Observable<ResponseOrderDetailtModel> {
    return this.secondary.getCurrentSale(idPedido);
  }

}
